import express from 'express'
import { PrismaClient } from '@prisma/client'
import { createTodoSchema, updateTodoSchema } from '../validators/todo'
import logger from '../logger'

const prisma = new PrismaClient()
const router = express.Router()

// list
router.get('/', async (req, res) => {
  const todos = await prisma.todo.findMany({ orderBy: { createdAt: 'desc' } })
  logger.info(`Fetched ${todos.length} todos`)
  res.json(todos)
})

// get one
router.get('/:id', async (req, res) => {
  const id = Number(req.params.id)
  const todo = await prisma.todo.findUnique({ where: { id } })
  if (!todo) return res.status(404).send('Not found')
  res.json(todo)
})

// create
router.post('/', async (req, res) => {
  const parse = createTodoSchema.safeParse(req.body)
  if (!parse.success) return res.status(400).json({ error: parse.error.format() })
  const data = parse.data
  const todo = await prisma.todo.create({ data })
  logger.info(`Created new todo: ${todo.id}`)
  res.status(201).json(todo)
})

// update
router.put('/:id', async (req, res) => {
  const id = Number(req.params.id)
  logger.info(`completed todo id: ${id}`)
  const parse = updateTodoSchema.safeParse(req.body)
  logger.info(`completed todo parse: ${parse}`)
  if (!parse.success) return res.status(400).json({ error: parse.error.format() })
  const data = parse.data
  try {
    logger.info(`completed todo: ${data}`)
    const todo = await prisma.todo.update({ where: { id }, data })
    logger.info(`completed todo: ${todo}`)
    res.json(todo)
  } catch (e) {
    res.status(404).send('Not found or update failed')
  }
})

// delete
router.delete('/:id', async (req, res) => {
  const id = Number(req.params.id)
  try {
    await prisma.todo.delete({ where: { id } })
    res.status(204).send('')
  } catch (e) {
    res.status(404).send('Not found')
  }
})

export default router
