import { Router } from 'express'
import { healthRouter } from './health'
import { rewardsRouter } from './rewards'

const router = Router()

router.use('/health', healthRouter)
router.use('/rewards', rewardsRouter)

export { router }
