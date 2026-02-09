
const AddPersonForm = ({persons, setPersons, newName, setNewName, newNumber, setNewNumber}) => {
  const addPerson = (event) => {
    event.preventDefault()
    const currID = persons.at(-1).id
    const newPerson = { name : newName, number: newNumber, id: currID +1}
    console.log(newPerson) 
    if (!newName || !newNumber) return 
    if (!persons.some(item => item.name == newName)){
      const newList = persons.concat(newPerson)
      setPersons(newList)
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
