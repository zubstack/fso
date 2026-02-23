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
      .then((initialData) => {
        setPersons(initialData)
      })
      .catch(error => alert(`Error while trying to retrive data: ${error.message}`))
  }, [])

  const peopleToShow = searchingString == ''
    ? persons
    : persons.filter((person) =>  person.name.toLowerCase().startsWith(searchingString.toLowerCase()))
  
  const clearForm = () => {
    setNewName("")
    setNewNumber("")
  } 

  const notifyWith = (message, type) => {
    setNotification({message, type})
    setTimeout(() => {
      setNotification(null)
    }, 5000)
  }

  const updatePerson = (person) => {
    if(window.confirm(`Person ${person.name} already exists. Do you want to update its number?`)){
      personService
        .update({...person, number: newNumber})
        .then(result => {
          setPersons(persons.map(item => item.id != person.id ? item : result)) // this works better than the filter approach
          notifyWith(`Person ${person.name} updated`, "success")
          clearForm()
        })
        .catch(error => {
          notifyWith("Update failed process, please try again.", "error")
          setPersons(persons.filter(item => item.id != person.id))
        })
    }
  }

  const onAddPerson = (event) => {
    event.preventDefault()
    if (!newName || !newNumber) return 

    const existingPerson = persons.find(item => item.name == newName)

    if (existingPerson){
      updatePerson(existingPerson)
      return
    }
    personService
      .create({ name : newName, number: newNumber})
      .then(data => {
        setPersons(persons.concat(data))
        notifyWith(`Person ${newName} created.`, "success")
        clearForm()
      })
      .catch(error => {
        notifyWith("Create process failed, please try again", "error")
      })
  }

  const onRemovePerson = (person) => {
    if(window.confirm(`Are you sure to delete ${person.name}?`)){
      personService
        .remove(person.id)
        .then(() => {
            setPersons(persons.filter( item => item.id != person.id))
            notifyWith(`Person ${person.name} deleted.`, 'success')
          } 
        )
        .catch(error => {
          notifyWith("Remove process failed, please try again", "error")
        })
    }
  }

  return (
    <div>
      <Notification notification={notification} />
      <h2>Phonebook</h2>
      <AddPersonForm 
        newName={newName}
        setNewName={setNewName}
        newNumber={newNumber}
        setNewNumber={setNewNumber}
        onAddPerson={onAddPerson}
      />
      <h2>Numbers</h2>
      <hr/>
      <Filter setSearchingString={setSearchingString} searchingString={searchingString}/>
      <hr/>
      <Persons peopleToShow={peopleToShow} onRemovePerson={onRemovePerson}/>
    </div>
  )
}

export default App
