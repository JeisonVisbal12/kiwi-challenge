import { readFile, writeFile } from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';
import { randomUUID } from 'crypto';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const dataPath = path.resolve(__dirname, '../../data/rewards.json');
async function loadState() {
    const json = await readFile(dataPath, 'utf8');
    return JSON.parse(json);
}
async function saveState(state) {
    await writeFile(dataPath, JSON.stringify(state, null, 2), 'utf8');
}
export const rewardsRepo = {
    async getState() {
        return loadState();
    },
    async updateState(mutator) {
        const state = await loadState();
        const result = mutator(state);
        const next = (result ?? state);
        await saveState(next);
        return next;
    },
    newTransaction(tx) {
        return { ...tx, id: randomUUID() };
    },
};
