import cors from 'cors'
import express from 'express'
import morgan from 'morgan'
import { env } from './config/env'
import { errorHandler } from './middlewares/error-handler'
import { router } from './routes'

const app = express()

app.use(cors({ origin: env.allowOrigins.length ? env.allowOrigins : true }))
app.use(express.json())
app.use(morgan(env.nodeEnv === 'production' ? 'combined' : 'dev'))

app.use('/api', router)

app.use(errorHandler)

export { app }
