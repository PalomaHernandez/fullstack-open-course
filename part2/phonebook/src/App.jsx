import { useState, useEffect } from 'react'
import personService from './services/persons'
import Notification from './components/Notification'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'

const App = () => {
  const [persons, setPersons] = useState([]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filter, setFilter] = useState('')
  const [message, setMessage] = useState(null)
  const [messageType, setMessageType] = useState(null)

  useEffect(() => {
    personService.getAll()
    .then(initialPersons => {
      setPersons(initialPersons)
    })
  }, [])

  const updatePerson = () => {
    const person = persons.find(p => p.name.toLowerCase() === newName.toLowerCase())
    const updatedPerson = { ...person, number: newNumber }
    personService.update(person.id, updatedPerson)
    .then(returnedPerson => {
      setPersons(persons.map(p => p.id !== person.id ? p : returnedPerson))
      showNotification(`Updated ${returnedPerson.name}`, 'success')
    })
    .catch(() => {
      setPersons(persons.filter(p => p.id !== person.id))
      showNotification(`Information of ${person.name} has already been removed from server`, 'error')
    })
    .finally(() => {
      setNewName('')
      setNewNumber('')
    })
  }

  const addPerson = (event) => {
    event.preventDefault()
    if(persons.some(person => person.name.toLowerCase() === newName.toLowerCase())) {
      if(window.confirm(`${newName} is already added to phonebook, replace the old number with a new one?`)){
        updatePerson()
      }
      return
    }
    const personObject = {
      name: newName,
      number: newNumber,
    }
    personService.create(personObject)
    .then(returnedPerson => {
      setPersons(persons.concat(returnedPerson))
      showNotification(`Added ${returnedPerson.name}`, 'success')
    })
    .catch(() => {
      setPersons(persons.filter(p => p.id !== id))
      showNotification(`Information of ${person.name} has already been removed from server`, 'error')
    })
    .finally(() => {
      setNewName('')
      setNewNumber('')
    })
  }

  const deletePerson = (id) => {
    const person = persons.find(p => p.id === id)
    if(window.confirm(`Delete ${person.name} ?`)) {
      personService.deletePerson(person.id)
      .then(() => {
        setPersons(persons.filter(person => person.id !== id))
        showNotification(`Deleted ${person.name}`, 'success')
      })
      .catch(() => {
        setPersons(persons.filter(p => p.id !== id))
        showNotification(`Information of ${person.name} has already been removed from server`, 'error')
      })
    }
  }

  const showNotification = (message, type) => {
    setMessage(message)
    setMessageType(type)
    setTimeout(() => {
      setMessage(null)
      setMessageType(null)
    }, 5000)
  }

  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }

  const handleFilterChange = (event) => {
    setFilter(event.target.value)
  }

  const filteredPersons = filter ? persons.filter(person => person.name.toLowerCase().includes(filter.toLowerCase())) : persons

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={message} type={messageType}/>
      <Filter filter={filter} handleFilterChange={handleFilterChange} />
      <h2>Add a new</h2>
      <PersonForm 
        newName={newName} 
        newNumber={newNumber} 
        handleNameChange={handleNameChange} 
        handleNumberChange={handleNumberChange} 
        addPerson={addPerson}
      />
      <h2>Numbers</h2>
      <Persons persons={filteredPersons} filter={filter} deletePerson={deletePerson} />
    </div>
  )
}

export default App