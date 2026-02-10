import personService from '../services/persons.jsx'

const AddPersonForm = ({persons, setPersons, newName, setNewName, newNumber, setNewNumber}) => {
  const addPerson = (event) => {
    event.preventDefault()
    const newPerson = { name : newName, number: newNumber}
    const existingPerson = persons.find(item => item.name == newName)

    if (!newName || !newNumber) return 
    if (!existingPerson){
      personService
        .create(newPerson)
        .then(data => setPersons(persons.concat(data)))
        .catch(error => console.log(error))
    }else{
      if(window.confirm('This person already exists. Do you want to update its number?')){
        personService
          .update(existingPerson.id, newPerson)
          .then(result => {
            const filtered = persons.filter(item => item.name != newName)
            setPersons([...filtered, result])
          })
          .catch(error => console.log(error))
      }
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
