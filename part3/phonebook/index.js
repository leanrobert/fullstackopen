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
  if(!req.body.name || !req.body.number) {
    return res.status(404).json({ error: "Missing content" })
  }

  const person = new Person({
    name: req.body.name,
    number: req.body.number
  })

  person.save().then(res => console.log(`${person.name} created`))

  res.json(person)
})

app.delete('/api/persons/:id', (req, res) => {
  Person.findByIdAndRemove(req.params.id)
    .then(result => res.status(204).end())
    .catch(err => console.log(err))
})

app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
})