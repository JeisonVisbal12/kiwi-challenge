import { Router } from 'express'
import { rewardsService } from '../services/rewardsService'

const rewardsRouter = Router()

rewardsRouter.get('/balance', async (_req, res, next) => {
  try {
    const balance = await rewardsService.getBalance()
    res.json(balance)
  } catch (err) {
    next(err)
  }
})

rewardsRouter.get('/transactions', async (_req, res, next) => {
  try {
    const transactions = await rewardsService.getTransactions()
    res.json(transactions)
  } catch (err) {
    next(err)
  }
})

rewardsRouter.get('/methods', async (_req, res, next) => {
  try {
    const methods = await rewardsService.getMethods()
    res.json(methods)
  } catch (err) {
    next(err)
  }
})

rewardsRouter.post('/withdraw', async (req, res, next) => {
  try {
    const result = await rewardsService.withdraw(req.body)
    res.json(result)
  } catch (err) {
    next(err)
  }
})

export { rewardsRouter }
