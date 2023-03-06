import express from 'express'
import morgan from 'morgan'
import cors from 'cors'

const app = express()

app.use(cors())

app.use(express.json())

let data = [
  {
    "id": 1,
    "name": "Arto Hellas",
    "number": "040-123456"
  },
  {
    "id": 2,
    "name": "Ada Lovelace",
    "number": "39-44-5323523"
  },
  {
    "id": 3,
    "name": "Dan Abramov",
    "number": "12-43-234345"
  },
  {
    "id": 4,
    "name": "Mary Poppendieck",
    "number": "39-23-6423122"
  }
]

morgan.token('data', (req, res) => {
  return JSON.stringify(req.body)
})

app.use(morgan(':method :url :status :res[content-length] - :response-time ms :data'))

app.get('/info', (req, res) => {
  const time = new Date()
  const size = data.length

  res.send(`<p>phonebook hast info for ${size} people</p><p>${time}</p>`)
})

app.get('/api/persons', (req, res) => {
  res.json(data)
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

app.listen(3001, () => {
  console.log("Server started on port 3001");
})