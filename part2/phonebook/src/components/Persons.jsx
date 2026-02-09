import personService from '../services/persons.jsx'

const PersonItem = ({person, removePerson}) => {
  return (
    <div>
      <p>{person.name}: {person.number}</p> 
      <button onClick={()=> removePerson(person.id)}>delete</button>
    </div>
  )
}

const Persons = ({persons, setPersons, searchingString}) => {

  const peopleToShow = searchingString == ''
    ? persons
    : persons.filter((person) =>  person.name.toLowerCase().startsWith(searchingString.toLowerCase()))
  
  const removePerson = (personId) => {
    if(window.confirm("Are you sure to delete this?")){
      personService
        .remove(personId)
        .then(data => setPersons(persons.filter(
          item => item.id != personId
        )))
        .catch(error => console.log(error))
    }
  }

  return (
    <>
      {peopleToShow.map((person) => {
        return (
          <PersonItem key={person.id} person={person} removePerson={removePerson}/>
        )
      })} 
    </>
  )
}

export default Persons
