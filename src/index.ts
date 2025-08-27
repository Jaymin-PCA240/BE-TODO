import express from 'express'
import morgan from 'morgan'
import logger from "./logger";
import cors from 'cors'
import dotenv from 'dotenv'
import { PrismaClient } from '@prisma/client'
import todosRouter from './routes/todos'

dotenv.config()
const app = express()
const prisma = new PrismaClient()

// --- Logging Middleware ---
// use morgan but send logs to our custom logger
app.use(
  morgan('combined', {
    stream: {
      write: (message) => {
        // remove newline at the end of message
        logger.info(message.trim())
      },
    },
  })
)

// also log unhandled errors globally
app.use((req, res, next) => {
  res.on('finish', () => {
    logger.info(`${req.method} ${req.originalUrl} ${res.statusCode}`)
  })
  next()
})

app.use(cors())
app.use(express.json())

app.get('/health', async (req, res) => {
  logger.info('Health check called')
  res.json({ status: 'ok' })
})

// mount routes (routes/todos uses its own prisma instance import)
app.use('/api/todos', todosRouter)

// error handler
app.use((err: any, req: express.Request, res: express.Response, next: express.NextFunction) => {
  logger.error(`Unhandled error: ${err.message}`, { stack: err.stack })
  res.status(500).json({ error: 'Internal Server Error' })
})

const PORT = process.env.PORT || 8080
app.listen(Number(PORT), () => {
  logger.info(`🚀 Server listening on port ${PORT}`)
})
