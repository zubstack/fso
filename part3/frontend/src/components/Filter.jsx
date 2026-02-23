const Filter = ({searchingString, setSearchingString}) => {

  return (
    <>
      <strong>search: </strong><input value={searchingString} onChange={(event)=>setSearchingString(event.target.value)}/>
    </>
  )
}

export default Filter
