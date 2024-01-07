import 'dotenv/config'

import express from 'express'
import morgan from 'morgan'
import cors from 'cors'
import { phoneBookRouter } from './exercises/3.13-3.22/controllers/phoneBook.js'
import { DatabaseConnection } from './exercises/3.13-3.22/config/db.js'

const app = express()
const PORT = process.env.PORT || 3000

// const requestLogger = (request, response, next) => {
//     console.log('Method:', request.method)
//     console.log('Path:  ', request.path)
//     console.log('Body:  ', request.body)
//     console.log('---')
//     next()
// }

const errorHandler = (error, request, response, next) => {
  console.error(error.message)

  if (error.name === 'CastError') {
    return response.status(400).send({ error: 'malformatted id' })
  } else if (error.name === 'ValidationError') {
    return response.status(400).json({ error: error.message })
  }

  next(error)
}

const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: 'unknown endpoint' })
}

app.use(cors())
app.use(express.json())
app.use(express.urlencoded())
morgan.token('body', function (req) {return Object.keys(req.body).length > 0 ? JSON.stringify(req.body) : ''})
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :body'))
app.use(express.static('dist'))

DatabaseConnection()




app.use('/api/persons', phoneBookRouter)

app.use(unknownEndpoint)
app.use(errorHandler)


app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
