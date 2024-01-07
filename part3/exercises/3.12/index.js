import { mockData, setMockData } from '../../mock-data/data.js'
import express from 'express'
import morgan from 'morgan'
import cors from 'cors'
const PORT = process.env.PORT || 3000
import dotenv from 'dotenv'

dotenv.config({ path: './.env' })

const requestLogger = (request, response, next) => {
  console.log('Method:', request.method)
  console.log('Path:  ', request.path)
  console.log('Body:  ', request.body)
  console.log('---')
  next()
}

const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: 'unknown endpoint' })
}

const generateId = () => {
  const maxId = mockData.length > 0
    ? Math.max(...mockData.map(n => n.id))
    : 0
  return maxId + 1
}

const generateRandomId = (min, max) => {
  return  Math.floor(Math.random() * (max - min + 1)) + min
}

const app = express()
app.use(cors())
app.use(express.json())
app.use(express.urlencoded())
morgan.token('body', function (req, res) {return Object.keys(req.body).length > 0 ? JSON.stringify(req.body) : ''})
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :body'))
app.use(express.static('dist'))


app.get('/api/persons', (req,res) => {
  res.json(mockData)
})

app.get('/api/persons/:id', (req,res) => {
  const id = req.params.id
  const person = mockData.find((user) => user.id === Number(id))
  if (person) {
    res.json(person)
  } else {
    res.status(404).end()
  }
})

app.post('/api/persons', (req, res) => {
  const { name, number } = req.body
  const id = generateId()
  const newEntry = {
    id,
    name,
    number
  }

  if (!name || !number) {
    res.json({
      error: `${!name? 'name is missing\n' : ''} ${!number? 'number is missing' : ''}`
    })
    return
  }

  if (mockData.find((entry) => entry.name.toLowerCase() === name.toLowerCase())) {
    res.json({ error: 'the name already exists in the phonebook' })
    return
  }

  mockData.push(newEntry)
  res.json(newEntry).end()

})

app.delete('/api/persons/:id', (req,res) => {
  const reqId = req.params.id
  setMockData(mockData.filter(({ id }) => id !== Number(reqId)))
  res.status(204).end()
})

app.get('/api/info', (req,res) => {

  const phoneBookSize = mockData.length
  const localDateTime = new Date()

  res.send('<p>Phonebook has info for ' + phoneBookSize + ' people </p>' +
        '<p>' + localDateTime.toString() + '</p>' )
})

app.use(unknownEndpoint)

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
