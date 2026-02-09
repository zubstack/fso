
const Persons = ({peopleToShow}) => {
  return (
    <>
      {peopleToShow.map((person) => {
        return (
           <p key={person.name}>{person.name}: {person.number}</p> 
        )
      })} 
    </>
  )
}

export default Persons
