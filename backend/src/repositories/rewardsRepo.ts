import { readFile, writeFile } from 'fs/promises'
import path from 'path'
import { fileURLToPath } from 'url'
import { randomUUID } from 'crypto'
import type { RewardsState, Transaction } from '../domain/types'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const dataPath = path.resolve(__dirname, '../../data/rewards.json')

async function loadState(): Promise<RewardsState> {
  const json = await readFile(dataPath, 'utf8')
  return JSON.parse(json) as RewardsState
}

async function saveState(state: RewardsState) {
  await writeFile(dataPath, JSON.stringify(state, null, 2), 'utf8')
}

export const rewardsRepo = {
  async getState() {
    return loadState()
  },

  async updateState(mutator: (state: RewardsState) => RewardsState | void) {
    const state = await loadState()
    const result = mutator(state)
    const next = (result ?? state) as RewardsState
    await saveState(next)
    return next
  },

  newTransaction(tx: Omit<Transaction, 'id'>): Transaction {
    return { ...tx, id: randomUUID() }
  },
}
