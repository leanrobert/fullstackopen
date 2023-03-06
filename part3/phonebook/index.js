import express from 'express'
import morgan from 'morgan'
import cors from 'cors'
import dotenv from 'dotenv'
import mongoose from 'mongoose'
import Person from './mongo.js'

dotenv.config()

const app = express()

app.use(cors())

app.use(express.json())

app.use(express.static('build'))

const PORT = process.env.PORT || 3001

const url = process.env.MONGO_URI

mongoose.set('strictQuery', false)
mongoose.connect(url)

morgan.token('data', (req, res) => {
  return JSON.stringify(req.body)
})

app.use(morgan(':method :url :status :res[content-length] - :response-time ms :data'))

app.get('/api/persons', (req, res) => {
  Person.find({}).then(persons => {
    res.json(persons)
  })
})

app.get('/api/persons/:id', (req, res) => {
  const id = Number(req.params.id)
  const person = data.filter(phone => phone.id === id)

  if(person) {
    res.json(person)
  } else {
    res.status(404).end()
  }
})

app.post('/api/persons', (req, res) => {
  const id = Math.floor(Math.random() * 100000)

  if(!req.body.name || !req.body.number) {
    return res.status(404).json({ error: "Missing content" })
  }

  if(data.filter(person => person.name === req.body.name).length >= 1) {
    return res.status(500).json({ error: "Name must be unique" })
  }

  const person = {
    id,
    name: req.body.name,
    number: req.body.number
  }

  data = data.concat(person)

  res.json(person)
})

app.delete('/api/persons/:id', (req, res) => {
  const id = Number(req.params.id)
  data = data.filter(info => info.id !== id)

  res.status(204).end()
})

app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
})