# Kiwi Challenge – Rewards/Withdraw App

Aplicación fullstack que replica el flujo de Rewards y retiro del Figma entregado. Se trabajó con GitHub Spec-Kit para documentar especificación, plan y tareas.

## Enfoque técnico

- Frontend: React 18 + Vite, React Router v6, React Query para estado remoto, CSS global con tipografía Poppins e íconos provistos. Componentes reutilizables (BalanceCard, TransactionItem, MethodCard, InfoCard, BackButton) para mantener consistencia.
- Backend: Express 5 + TypeScript, Zod para validación, arquitectura en capas (router → service → repo). Persistencia sencilla en JSON para el reto. Middlewares de CORS, JSON body, logging y manejador de errores homogéneo.
- API REST `/api/rewards`: balance, transacciones, métodos y retiro. Contrato detallado en spec.
- UX: fidelidad a Figma, estados de carga y deshabilitado, mensajes claros de error/éxito, inputs validados.

## Arquitectura y decisiones

- Estado remoto cacheado con React Query; invalidación tras retiro para refrescar balance y transacciones.
- Validaciones en backend (Zod) + reglas de negocio (método existe, saldo suficiente). Los mensajes de error se muestran en UI.
- Persistencia JSON para simplificar despliegue local; el esquema está en `backend/data/rewards.json`.
- Rutas de frontend en [frontend/src/App.jsx](frontend/src/App.jsx); backend montado en `/api` en [backend/src/app.ts](backend/src/app.ts).

## Setup

Requisitos: Node.js 18+

```bash
# Clonar
git clone <repo>
cd kiwi-challenge

# Backend
cd backend
npm install

# Frontend
cd ../frontend
npm install
```

## Ejecutar

Backend (puerto 3001 por defecto):

```bash
cd backend
npm run dev
```

Frontend (Vite en 5173 por defecto):

```bash
cd frontend
npm run dev
```

Variable API opcional: `VITE_API_BASE` (ej. http://localhost:3001/api/rewards). Por defecto usa esa URL.

## Build

- Backend: `npm run build` dentro de `backend` (salida en dist/).
- Frontend: `npm run build` dentro de `frontend` (salida en dist/).

## Tests

- Backend: `npm test` (vitest + supertest).
- Frontend: sin suite automatizada incluida; build actúa como smoke test.

## API (resumen)

- GET /api/rewards/balance → { amount }
- GET /api/rewards/transactions → Transaction[] (desc por fecha)
- GET /api/rewards/methods → WithdrawalMethod[]
- POST /api/rewards/withdraw { amount, methodId } → { status:'success', balance, method, transaction }
- Errores: 400 VALIDATION_ERROR (Zod), 400 BAD_REQUEST (negocio), 500 UNKNOWN_ERROR.

## Supuestos

- Un único usuario; sin autenticación.
- Moneda mostrada con prefijo $ (USD).
- Persistencia en archivo JSON suficiente para la demo.
- Se agrega boton de input de valor a retirar no especificado.
- Se unifica los retiros y movimientos como general de los productos del cliente.
- Sin paginación ni filtros adicionales de transacciones.

## Artefactos Spec-Kit

- Especificación: [.specify/spec.md](.specify/spec.md)
- Plan: [.specify/plan.md](.specify/plan.md)
- Tareas: [.specify/tasks.md](.specify/tasks.md)

## Notas de cumplimiento

- Se siguió la constitución en [.specify/memory/constitution.md](.specify/memory/constitution.md) para React-first, API-driven y testing pragmático.
- Flujo completo implementado: Rewards → Withdraw Select → Methods → Confirm → Success.
