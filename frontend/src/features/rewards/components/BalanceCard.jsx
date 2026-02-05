import forwardIcon from '../../../assets/Forward.svg'

function BalanceCard({ amount, onWithdraw }) {
  return (
    <div className="card balance-card">
      <div>
        <div className="balance-label">Monto acumulado</div>
        <div className="balance-amount">${amount.toFixed(2)}</div>
      </div>
      <button className="withdraw-btn" onClick={onWithdraw}>
        <span>Retirar</span>
        <img src={forwardIcon} alt="Ir a retiro" width={12} height={12} />
      </button>
    </div>
  )
}

export default BalanceCard
