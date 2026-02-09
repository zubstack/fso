import axios from "axios"
import { useState, useEffect } from 'react'
import Filter from "./components/Filter.jsx";
import AddPersonForm from "./components/AddPersonForm.jsx";
import Persons from "./components/Persons.jsx";
import './App.css'

const App = () => {
  const [persons, setPersons] = useState([]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [searchingString, setSearchingString] = useState('')

  useEffect(() => {
    axios
      .get('http://localhost:3002/persons') 
      .then((result) => {
        setPersons(result.data)
      })
  }, [])
  

  const peopleToShow = searchingString == ''
    ? persons
    : persons.filter((person) =>  person.name.toLowerCase().startsWith(searchingString.toLowerCase()))

  return (
    <div>
      <h2>Phonebook</h2>
      <AddPersonForm persons={persons} setPersons={setPersons} newName={newName} setNewName={setNewName} newNumber={newNumber} setNewNumber={setNewNumber}/>
      <h2>Numbers</h2>
      <hr/>
      <Filter setSearchingString={setSearchingString} searchingString={searchingString}/>
      <hr/>
      <Persons peopleToShow={peopleToShow}/>
    </div>
  )
}

export default App
