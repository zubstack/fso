const express = require('express')
let persons = require('./db.json')
const app = express()

app.use(express.json())

app.get('/', (request, response) => {
  response.send('<h1>Hello Express!</h1>')
})

app.get('/api/persons', (request, response) => {
  response.send(persons)
})

app.get('/api/info', (request, response) => {
  response.send(`
    <h3>Phonebook has info for ${persons.length} people.</h3>
    <p>${Date().toString()}</p>
  `)
})

app.get('/api/persons/:id', (request, response) => {
  const id = parseInt(request.params.id);
  const person = persons.find((item) => item.id == id )
  
  if (person){
    response.status(200).json(person)
  } else {
    response.status(404).json({message: "person not found"})
  }
})

app.delete('/api/persons/:id', (request, response) => {
  const id = parseInt(request.params.id);

  const initialLength = persons.length
  persons = persons.filter((item) => item.id != id) 

  if (persons.length < initialLength){
    response.status(204).end()
  } else {
    response.status(404).json({message: "person not found"})
  }
})

app.post('/api/persons', (request, response) => {

  const {name, number} = request.body
  if (!name || !number) {
    response.status(400).json({message: 'missing data'}) 
    return
  }

  if (persons.some((item) => item.name == name)) {
    response.status(400).json({message: 'name must to be unnique'}) 
    return
  }

  const newPerson = {
    id: Math.round(Math.random() * (1000 - 100) + 100),
    name: name,
    number: number
  }
  
  persons.push(newPerson)
  response.status(201).json(newPerson)
})

const PORT = 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
