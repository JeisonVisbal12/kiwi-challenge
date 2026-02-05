import dotenv from 'dotenv'

dotenv.config()

const rawOrigins = process.env.ALLOW_ORIGINS?.split(',').map((origin) => origin.trim()).filter(Boolean) ?? []

export const env = {
  nodeEnv: process.env.NODE_ENV ?? 'development',
  port: Number(process.env.PORT ?? 3001),
  allowOrigins: rawOrigins,
}
