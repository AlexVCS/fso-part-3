const express = require('express')
const app = express()

app.use(express.json())

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

// const morgan = ('tiny')

// app.use(morgan)

app.get('/', (request, response) => {
  response.send('<h1>Hello World!</h1>')
})

app.get('/api/persons', (request, response) => {
  // console.log(persons);
  response.json(persons)
})

app.get('/api/persons/:id', (request, response) => {
  const id = Number(request.params.id)
  const person = persons.find(person => person.id === id)
  if (person) {
    response.json(person)
  } else {
    response.status(404).end()
  }
})

app.delete('/api/persons/:id', (request, response) => {
  const id = Number(request.params.id)
  persons = persons.filter(person => person.id !== id)

  response.status(204).end()
})


app.get('/info', (request, response) => {
  let date = new Date()
  response.send(`<p>Phonebook has info for ${persons.length} people</p>
                 <p> ${date} </p>`)
})

app.post('/api/persons', (request, response) => {
  const person = request.body
  console.log(person)
  if (!person.name || !person.phone) {
    return response.status(400).json({
      error: 'Each entry must have a name and phone number'
    })
  }

  if (persons.some((p) => p.name === person.name)) {
    return response.status(400).json({
      error: 'Each name must be unique'
    })
  }

  person.id = Math.floor(Math.random() * 200)
  persons.push(person)
  response.json(person)
  
  
})

const PORT = 3001
app.listen(PORT, () => {
console.log(`Server running on port ${PORT}`)
})