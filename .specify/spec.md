# Spec: Rewards Withdrawal Flow

## Context
- Objective: Replicar el flujo de Rewards/Retiro del Figma entregado.
- Users: Personas con saldo de recompensas que retiran a cuenta bancaria.
- Constraints: React frontend; API REST backend; uso de Spec-Kit artifacts; tiempo acotado.

## Scope
- Frontend: Pantallas Rewards (balance + transacciones), Withdraw Select (monto + método), Withdraw Methods (lista), Withdraw Confirm (resumen + submit), Withdraw Success (feedback), loaders/errores, estados de botones.
- Backend: Endpoints balance, transacciones, métodos, retiro; validaciones; persistencia simple (JSON store).
- Fuera de scope: Autenticación, multiusuario, paginación, i18n.

## Functional Requirements
- Ver saldo actual y lista de transacciones agrupadas por mes.
- Iniciar retiro desde Rewards.
- Ingresar monto (validar >0 y <= saldo) y elegir método; mostrar máximo disponible.
- Seleccionar método de retiro desde lista (estado seleccionado visible).
- Confirmar retiro: mostrar monto, método, CTA con loader mientras envía.
- Enviar retiro: POST genera transacción negativa, descuenta saldo, devuelve nuevo saldo y detalle.
- Mostrar éxito con datos del método y mensaje de tiempos.
- Manejo de errores: mensajes claros en toasts/alertas; deshabilitar CTA inválido.

## Non-Functional / UX
- Fidelidad visual a Figma (tipografía Poppins, espaciados, íconos provistos).
- Estados de carga y deshabilitado en botones; cursores adecuados.
- Respuesta rápida: store local con JSON para demo.
- Código limpio, componentes reutilizables (MethodCard, InfoCard, BackButton, BalanceCard, TransactionItem).

## Data Model
- Transaction { id, type: cashback|referral|withdrawal, title, date ISO, amount }
- WithdrawalMethod { id, label, icon? }
- RewardsState { balance: number, transactions: Transaction[], methods: WithdrawalMethod[] }

## API Contract (prefix /api/rewards)
- GET /balance -> { amount: number }
- GET /transactions -> Transaction[] (orden desc por fecha)
- GET /methods -> WithdrawalMethod[]
- POST /withdraw { amount:number, methodId:string } -> { status:'success', balance:number, method:WithdrawalMethod, transaction:Transaction }
- Errors: 400 BAD_REQUEST (mensaje), 400 VALIDATION_ERROR (Zod issues), 500 UNKNOWN_ERROR.

## Validation Rules
- amount debe ser number > 0 y <= balance actual.
- methodId debe existir en métodos almacenados.

## Frontend Flow
1) RewardsPage: fetch balance/transactions; agrupa por mes; CTA "Retirar" navega a /withdraw.
2) WithdrawSelect: input monto (prefill saldo), muestra máx, select MethodCard (vector + select arrow), CTA continúa si válido.
3) WithdrawMethods: lista de métodos, selecciona uno y vuelve con estado.
4) WithdrawConfirm: muestra monto, método, CTA envia POST; loader mientras pending; toasts en success/error.
5) WithdrawSuccess: muestra ilustración, monto/método, nota informativa, botón volver a Rewards.

## Assumptions
- Moneda en USD (formato simple con $).
- Sin autenticación; un único usuario y store compartido.
- JSON file sirve como almacenamiento persistente en entorno local.
- Sin paginación ni filtro de transacciones por simplicidad.
