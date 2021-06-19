const express = require('express')
const app = express()

let persons = [
  {
    id: 1,
    name: "Arto Hellas",
    number: "050-3432"
  },
  {
    id: 2,
    name: "Gentry Guthry",
    number: "320-2194"
  },
  {
    id: 3,
    name: "Nove Chin",
    number: "324-2390"
  },
  {
    id: 4,
    name: "Sindus Minsky",
    number: "239-3201"
  }
]

app.get('/', (request, response) => {
  response.send('<h1>Hello World!</h1>')
})

app.get('/api/persons', (request, response) => {
  response.json(persons)
})

app.get('api/persons/:id', (request, response) => {
  const id = Number(request.params.id)
  const person = persons.find(person => person.id === id)
  
  if (person) {
    response.json(person)
  } else {
    response.status(404).end()
  }
})

let ts = Date.now();

let date = new Date()

app.get('/info', (request, response) => {
  response.send(`<p>Phonebook has info for ${persons.length} people</p>
                 <p> ${date} </p>`)
})

const PORT = 3001
app.listen(PORT, () => {
console.log(`Server running on port ${PORT}`)
})