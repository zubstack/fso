import personService from '../services/persons.jsx'

const AddPersonForm = ({persons, setPersons, newName, setNewName, newNumber, setNewNumber}) => {
  const addPerson = (event) => {
    event.preventDefault()
    const newPerson = { name : newName, number: newNumber}

    if (!newName || !newNumber) return 
    if (!persons.some(item => item.name == newName)){
      personService
        .create(newPerson)
        .then(data => setPersons(persons.concat(data)))
        .catch(error => console.log(error))
    }else{
      alert(`${newName} was already included.`)
    }

    setNewName("")
    setNewNumber("")
  }
  
  return (
    <>
      <form onSubmit={addPerson}>
        <div>
          name: <input value={newName} onChange={(event)=>setNewName(event.target.value)}/>
          <hr/>
          number: <input value={newNumber} onChange={(event)=>setNewNumber(event.target.value)}/>
          <hr/>
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
    </>
  )
}

export default AddPersonForm 
