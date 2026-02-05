import { describe, it, expect, beforeEach } from 'vitest'
import request from 'supertest'
import { app } from '../app'
import { writeFile } from 'fs/promises'
import path from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const dataPath = path.resolve(__dirname, '../../data/rewards.json')

const seed = {
  balance: 15,
  transactions: [
    { id: 't1', type: 'withdrawal', title: 'Retiro a cuenta', date: '2025-09-20', amount: -15 },
    { id: 't2', type: 'referral', title: 'Bono de referido', date: '2025-09-18', amount: 15 },
  ],
  methods: [
    { id: 'acc1', label: 'Cuenta 1234', icon: '🏦' },
    { id: 'acc2', label: 'Cuenta 5678', icon: '🏦' },
  ],
}

async function resetData() {
  await writeFile(dataPath, JSON.stringify(seed, null, 2), 'utf8')
}

describe('Rewards API', () => {
  beforeEach(async () => {
    await resetData()
  })

  it('returns balance', async () => {
    const res = await request(app).get('/api/rewards/balance')
    expect(res.status).toBe(200)
    expect(res.body).toEqual({ amount: 15 })
  })

  it('lists transactions sorted desc', async () => {
    const res = await request(app).get('/api/rewards/transactions')
    expect(res.status).toBe(200)
    expect(res.body[0].id).toBe('t1')
  })

  it('returns methods', async () => {
    const res = await request(app).get('/api/rewards/methods')
    expect(res.status).toBe(200)
    expect(res.body.length).toBe(2)
  })

  it('processes a withdraw and updates balance', async () => {
    const res = await request(app).post('/api/rewards/withdraw').send({ amount: 5, methodId: 'acc1' })
    expect(res.status).toBe(200)
    expect(res.body.status).toBe('success')

    const balanceRes = await request(app).get('/api/rewards/balance')
    expect(balanceRes.body.amount).toBe(10)
  })

  it('rejects insufficient funds', async () => {
    const res = await request(app).post('/api/rewards/withdraw').send({ amount: 50, methodId: 'acc1' })
    expect(res.status).toBe(400)
    expect(res.body.error.message).toMatch(/Fondos insuficientes/)
  })
})
