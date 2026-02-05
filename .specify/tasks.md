# Tasks: Rewards Withdrawal Flow

## Backlog
- Setup frontend (Vite React, routing, React Query, Poppins, estilos base).
- Crear componentes reutilizables: BalanceCard, TransactionItem, MethodCard (leading/trailing icons), InfoCard, BackButton.
- Página Rewards: fetch balance/transactions, agrupar por mes, CTA retirar.
- Página Withdraw Select: input monto (prefill saldo), validación, selección método actual, error mensajes.
- Página Withdraw Methods: listar métodos, selección y retorno.
- Página Withdraw Confirm: mostrar monto/método, CTA con loader, toasts de éxito/error.
- Página Withdraw Success: resumen e info de procesamiento, CTA volver.
- Integración API frontend: rewardsApi con base URL configurable.
- Backend: Express + TS scaffolding, env config, health route.
- Backend: routes /balance, /transactions, /methods, /withdraw.
- Backend: rewardsService con validaciones (Zod), negocio (saldo suficiente, método existe), ordenamiento de transacciones.
- Backend: rewardsRepo sobre JSON (get/update, newTransaction).
- Backend: error middleware (Zod, errores negocio, fallback 500).
- Tests backend: vitest + supertest (health, balance, methods, withdraw success/error).
- Ajustes UX: estados disabled, loaders, íconos según Figma, spacing, tipografía.
- README: enfoque técnico, arquitectura, instrucciones run, supuestos, referencia Spec-Kit.
- Verificación final: builds frontend/backend y reporte de estado.

## Status (hoy)
- Implementación FE/BE completa; ajustes visuales hechos; falta actualizar README y registrar artefactos.
- Builds: frontend build ok; backend build/tests pendientes de correr en esta sesión.
