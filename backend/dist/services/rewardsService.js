import { z } from 'zod';
import { rewardsRepo } from '../repositories/rewardsRepo';
const withdrawInputSchema = z.object({
    amount: z.number().positive({ message: 'El monto debe ser mayor a cero' }),
    methodId: z.string().min(1, 'Debes seleccionar un método'),
});
function sortTransactions(transactions) {
    return [...transactions].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}
export const rewardsService = {
    async getBalance() {
        const state = await rewardsRepo.getState();
        return { amount: Number(state.balance.toFixed(2)) };
    },
    async getTransactions() {
        const state = await rewardsRepo.getState();
        return sortTransactions(state.transactions);
    },
    async getMethods() {
        const state = await rewardsRepo.getState();
        return state.methods;
    },
    async withdraw(input) {
        const { amount, methodId } = withdrawInputSchema.parse(input);
        const state = await rewardsRepo.getState();
        const method = state.methods.find((m) => m.id === methodId);
        if (!method) {
            throw new Error('Método de retiro no encontrado');
        }
        if (amount > state.balance) {
            throw new Error('Fondos insuficientes');
        }
        const tx = rewardsRepo.newTransaction({
            type: 'withdrawal',
            title: `Retiro a ${method.label}`,
            date: new Date().toISOString(),
            amount: -Math.abs(amount),
        });
        const nextState = await rewardsRepo.updateState((draft) => {
            draft.balance = Number((draft.balance + tx.amount).toFixed(2));
            draft.transactions = sortTransactions([...draft.transactions, tx]);
            return draft;
        });
        return { status: 'success', balance: nextState.balance, method: sanitizeMethod(method), transaction: tx };
    },
};
function sanitizeMethod(method) {
    return { id: method.id, label: method.label, icon: method.icon };
}
