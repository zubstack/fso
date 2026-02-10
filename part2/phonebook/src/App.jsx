import { useState, useEffect } from 'react'
import personService from "./services/persons.jsx";
import Filter from "./components/Filter.jsx";
import Notification from "./components/Notification.jsx";
import AddPersonForm from "./components/AddPersonForm.jsx";
import Persons from "./components/Persons.jsx";
import './App.css'

const App = () => {
  const [persons, setPersons] = useState([]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [searchingString, setSearchingString] = useState('')

  const [notification, setNotification] = useState(null)

  useEffect(() => {
    personService
      .getAll()
      .then((data) => {
        setPersons(data)
      })
      .catch(error => alert(`Error while trying to retrive data: ${error.message}`))
  }, [])

  return (
    <div>
      <Notification notification={notification} />
      <h2>Phonebook</h2>
      <AddPersonForm persons={persons} setNotification={setNotification} setPersons={setPersons} newName={newName} setNewName={setNewName} newNumber={newNumber} setNewNumber={setNewNumber}/>
      <h2>Numbers</h2>
      <hr/>
      <Filter setSearchingString={setSearchingString} searchingString={searchingString}/>
      <hr/>
      <Persons persons={persons} setPersons={setPersons} searchingString={searchingString}/>
    </div>
  )
}

export default App
