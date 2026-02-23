import personService from '../services/persons.jsx'

const PersonItem = ({person, onRemovePerson}) => {

  return (
    <div>
      <p>{person.name}: {person.number}</p> 
      <button onClick={()=> onRemovePerson(person)}>delete</button>
    </div>
  )
}

const Persons = ({peopleToShow, onRemovePerson}) => {

  return (
    <>
      {peopleToShow.map((person) => {
        return (
          <PersonItem key={person.id} person={person} onRemovePerson={onRemovePerson}/>
        )
      })} 
    </>
  )
}

export default Persons
