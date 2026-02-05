const API_BASE = import.meta.env.VITE_API_BASE ?? 'http://localhost:3001/api/rewards'

async function api(path, options = {}) {
  const res = await fetch(`${API_BASE}${path}`, {
    headers: { 'Content-Type': 'application/json' },
    ...options,
  })

  const data = await res.json().catch(() => null)

  if (!res.ok) {
    const message = data?.error?.message ?? 'Error inesperado'
    throw new Error(message)
  }

  return data
}

export async function fetchBalance() {
  return api('/balance')
}

export async function fetchTransactions() {
  return api('/transactions')
}

export async function fetchMethods() {
  return api('/methods')
}

export async function submitWithdraw({ amount, methodId }) {
  return api('/withdraw', {
    method: 'POST',
    body: JSON.stringify({ amount, methodId }),
  })
}
