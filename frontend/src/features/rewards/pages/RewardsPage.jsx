import { useNavigate } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query'
import BalanceCard from '../components/BalanceCard'
import TransactionItem from '../components/TransactionItem'
import { fetchBalance, fetchTransactions } from '../api/rewardsApi'
import '../../../App.css'

function formatMonth(dateStr) {
  const date = new Date(dateStr)
  return date.toLocaleDateString('es-ES', { month: 'long', year: 'numeric' })
}

function formatDate(dateStr) {
  const date = new Date(dateStr)
  return date.toLocaleDateString('es-ES', { month: 'long', day: 'numeric', year: 'numeric' })
}

function RewardsPage() {
  const navigate = useNavigate()
  const balanceQuery = useQuery({ queryKey: ['balance'], queryFn: fetchBalance })
  const txQuery = useQuery({ queryKey: ['transactions'], queryFn: fetchTransactions })

  const balance = balanceQuery.data?.amount ?? 0
  const transactions = (txQuery.data ?? []).slice().sort((a, b) => new Date(b.date) - new Date(a.date))

  const grouped = transactions.reduce((acc, tx) => {
    const month = formatMonth(tx.date)
    if (!acc[month]) acc[month] = []
    acc[month].push(tx)
    return acc
  }, {})

  return (
    <div className="page">
      <h2 className="section-title" style={{ marginTop: 8 }}>Rewards</h2>

      <BalanceCard amount={balance} onWithdraw={() => navigate('/withdraw')} />

      <div className="transactions">
        {Object.entries(grouped).map(([month, items]) => (
          <div className="transaction-group" key={month}>
            <div style={{ fontWeight: 700, color: '#6b7280', textTransform: 'capitalize' }}>{month}</div>
            {items.map((item) => (
              <TransactionItem
                key={item.id}
                title={item.title}
                dateLabel={formatDate(item.date)}
                amount={item.amount}
                type={item.type}
              />
            ))}
          </div>
        ))}
      </div>
    </div>
  )
}

export default RewardsPage
