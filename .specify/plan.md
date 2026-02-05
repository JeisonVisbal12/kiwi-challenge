# Plan: Rewards Withdrawal Flow

## Architecture
- Frontend: React 18 + Vite; React Router v6; React Query para datos remotos; CSS global con Poppins; componentes reutilizables (BalanceCard, TransactionItem, MethodCard, InfoCard, BackButton).
- Backend: Express 5 + TypeScript; Zod para validación; capas router -> service -> repo; persistencia en archivo JSON; middlewares de CORS, JSON body, logging (morgan) y manejo de errores.
- API base: /api/rewards con endpoints balance, transactions, methods, withdraw.

## Data Flow
- FE usa React Query para cachear balance/transactions/methods; invalidación tras retiro.
- POST /withdraw valida en backend, descuenta saldo, agrega transacción negativa, responde payload usado por FE para navegar a success.

## State Management
- Local state para formularios (monto, selección método, toasts).
- Server state con React Query (balance, transactions, methods) + invalidation.

## Error & UX Handling
- Botones deshabilitados si monto inválido o sin método; cursor not-allowed.
- Loader ring en CTA mientras POST pendiente.
- Toast simple de error/success en confirm.
- Mensajes de error legibles desde backend (Zod/negocio) surfaced en UI.

## Security & Validation
- Backend valida amount > 0, methodId no vacío; negocio valida método existe y saldo suficiente.
- CORS configurable via env ALLOW_ORIGINS; PORT configurable.

## Testing Strategy
- Backend: vitest + supertest para endpoints principales (health, balance, methods, withdraw feliz y casos de error).
- Frontend: no se agregó suite formal; build como smoke. (limitable por tiempo).

## Build & Deploy
- Frontend: `npm run build` genera dist; VITE_API_BASE configurable.
- Backend: `npm run build` genera dist; `npm start` sirve API.

## Work Breakdown (high level)
1) Levantar spec (hecho): definir alcance, API, validaciones, UX.
2) Plan (hecho): arquitectura FE/BE, flujos de datos y manejo de errores.
3) Tasks: detallar backlog (ver tasks.md).
4) Implement FE: rutas, componentes, estilos, integración API.
5) Implement BE: rutas, servicios, repo JSON, validaciones Zod, errores.
6) Tests BE: vitest/supertest para endpoints clave.
7) README: documentar enfoque, setup, supuestos.
8) Verificación: builds y tests.
