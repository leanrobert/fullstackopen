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

app.get('/info', (req, res, next) => {
  Person.find({})
    .then(persons => {
      res.send(`<p>Phonebook has info for ${persons.length} people</p><p>${new Date()}</p>`)
    })
})

app.get('/api/persons', (req, res) => {
  Person.find({}).then(persons => {
    res.json(persons)
  })
})

app.get('/api/persons/:id', (req, res, next) => {
  Person.findById(req.params.id)
    .then(found => {
      if (found) {
        res.json(found)
      } else {
        res.status(404).end()
      }
    })
    .catch(error => next(error))
})

app.post('/api/persons', (req, res, next) => {
  if(!req.body.name || !req.body.number) {
    return res.status(404).json({ error: "Missing content" })
  }

  const person = new Person({
    name: req.body.name,
    number: req.body.number
  })

  console.log(person);

  person.save().then(response => res.json(person))
    .catch(error => next(error))
})

app.put('/api/persons/:id', (req, res, next) => {
  const body = req.body

  const person = {
    name: body.name,
    number: body.number
  }

  Person.findByIdAndUpdate(req.params.id, person, { new: true, runValidators: true, context: 'query'})
    .then(updated => res.json(updated))
    .catch(err => next(err))
})

app.delete('/api/persons/:id', (req, res, next) => {
  Person.findByIdAndRemove(req.params.id)
    .then(result => res.status(204).end())
    .catch(err => next(err))
})

const errorhandler = (error, req, res, next) => {
  console.error(error.message)

  if(error.name === 'Cast Error') {
    return res.status(400).send({ error: 'malformatted id' })
  } else if (error.name === 'ValidationError') {
    return res.status(400).send({ error: error.message })
  }

  next(error)
}

app.use(errorhandler)

app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
})