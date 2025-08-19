import express from 'express'
import morgan from 'morgan'
import cors from 'cors'
import dotenv from 'dotenv'
import { PrismaClient } from '@prisma/client'
import todosRouter from './routes/todos'

dotenv.config()
const app = express()
const prisma = new PrismaClient()

app.use(morgan('dev'))
app.use(cors())
app.use(express.json())

app.get('/health', async (req, res) => {
  res.json({ status: 'ok' })
})

// mount routes (routes/todos uses its own prisma instance import)
app.use('/api/todos', todosRouter)

const PORT = process.env.PORT || 8080
app.listen(Number(PORT), () => {
  console.log(`Server listening on port ${PORT}`)
})
