export type TransactionType = 'cashback' | 'referral' | 'withdrawal'

export interface Transaction {
  id: string
  type: TransactionType
  title: string
  date: string // ISO date string
  amount: number // positive credits, negative debits
}

export interface WithdrawalMethod {
  id: string
  label: string
  icon?: string
}

export interface RewardsState {
  balance: number
  transactions: Transaction[]
  methods: WithdrawalMethod[]
}
