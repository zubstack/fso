import personService from '../services/persons.jsx'

const AddPersonForm = ({onAddPerson, newName, setNewName, newNumber, setNewNumber}) => {
  
  return (
    <>
      <form onSubmit={onAddPerson}>
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
