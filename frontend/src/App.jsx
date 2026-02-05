import { Route, Routes, Navigate } from 'react-router-dom'
import './App.css'
import RewardsPage from './features/rewards/pages/RewardsPage'
import WithdrawSelectPage from './features/rewards/pages/WithdrawSelectPage'
import WithdrawMethodsPage from './features/rewards/pages/WithdrawMethodsPage'
import WithdrawConfirmPage from './features/rewards/pages/WithdrawConfirmPage'
import WithdrawSuccessPage from './features/rewards/pages/WithdrawSuccessPage'

function App() {
  return (
    <div className="app-shell">
      <Routes>
        <Route path="/" element={<RewardsPage />} />
        <Route path="/withdraw" element={<WithdrawSelectPage />} />
        <Route path="/withdraw/methods" element={<WithdrawMethodsPage />} />
        <Route path="/withdraw/confirm" element={<WithdrawConfirmPage />} />
        <Route path="/withdraw/success" element={<WithdrawSuccessPage />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </div>
  )
}

export default App
