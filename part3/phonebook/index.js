const express = require('express')
const morgan = require('morgan')
const cors = require('cors')
const Person = require('./person.js')

const app = express()

app.use(express.json())
app.use(cors())

morgan.token('body', function (req, res) { return JSON.stringify(req.body) })
app.use(morgan(':method :url :status - :response-time ms :body'))

app.use(express.static('dist'))

app.get('/api/persons', (request, response, next) => {
  Person.find({})
    .then((result) => {
      response.json(result)
    })
    .catch((error) => {
      next(error)
    })
})

app.get('/api/info', (request, response) => {
  response.json({
    date: `${Date().toString()}`
  })
})

app.get('/api/persons/:id', (request, response, next) => {
  Person.findById(request.params.id)
    .then((result) => {
      if (result) {
        response.json(result)
      } else {
        response.status(404).json({ message: 'person not found' })
      }
    })
    .catch((error) => {
      next(error)
    })
})

app.delete('/api/persons/:id', (request, response, next) => {
  Person.findByIdAndDelete(request.params.id)
    .then((result) => {
      if (result) {
        response.status(204).end()
      } else {
        response.status(404).json({ message: 'person not found' })
      }
    })
    .catch((error) => {
      next(error)
    })
})

app.post('/api/persons', (request, response, next) => {
  const { name, number } = request.body || {}
  if (!name || !number) {
    response.status(400).json({ message: 'missing data' })
    return
  }
  const newPerson = new Person({
    name: name,
    number: number,
  })
  newPerson.save()
    .then(result => {
      response.status(201).json(result)
    })
    .catch((error) => {
      next(error)
    })
})

app.put('/api/persons/:id', (request, response, next) => {
  const { name, number } = request.body || {}
  if (!name || !number) {
    return response.status(400).json({ message: 'missing data' })
  }
  // Check if provided name has not been taken.
  Person.find({})
    .then(persons => {
      const filtered = persons.filter((item) => item.id != request.params.id)
      const repeated = filtered.some((item) => item.name == name)
      if (repeated) {
        return Promise.reject({
          status: 400,
          message: 'this name has been taken'
        })
      }
      return Person.findById(request.params.id)
    })
    .then(person => {
      if (!person) {
        return Promise.reject({
          status: 404,
          message: 'person not found'
        })
      }
      person.name = request.body.name
      person.number = request.body.number
      return person.save()
    })
    .then(updatedPerson => {
      response.json(updatedPerson)
    })
    .catch((error) => {
      if (error.status) {
        return response.status(error.status).json({ message: error.message })
      }
      next(error)
    })
})

const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: 'unknown endpoint' })
}

app.use(unknownEndpoint)

const errorHandler = (error, request, response, next) => {
  console.error(error.stack)
  if (error.name == 'CastError') {
    return response.status(400).json({
      message: `Invalid ${error.path}: ${error.value}`
    })
  } else if (error.name === 'ValidationError') {
    return response.status(400).json({ error: error.message })
  }
  next(error)
}

app.use(errorHandler)

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
