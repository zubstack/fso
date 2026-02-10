import personService from '../services/persons.jsx'

const AddPersonForm = ({persons, setNotification, setPersons, newName, setNewName, newNumber, setNewNumber}) => {
  const addPerson = (event) => {
    event.preventDefault()
    const newPerson = { name : newName, number: newNumber}
    const existingPerson = persons.find(item => item.name == newName)

    if (!newName || !newNumber) return 
    if (!existingPerson){
      personService
        .create(newPerson)
        .then(data => {
          setPersons(persons.concat(data))
          setNotification({message: "created", type: "success"})
        })
        .catch(error => {
          setNotification({message: error.message, type: "error"})
        })
    }else{
      if(window.confirm('This person already exists. Do you want to update its number?')){
        personService
          .update(existingPerson.id, newPerson)
          .then(result => {
            setPersons(persons.map(item => item.id != existingPerson.id ? item : result)) // this works better than the filter approach
            setNotification({message: "updated", type: "success"})
          })
          .catch(error => {
            setNotification({message: error.message, type: "error"})
          })
      }
    }
    setNewName("")
    setNewNumber("")

    setTimeout(() => {
      setNotification(null)
    }, 5000)
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
