const Content = ({parts}) => {
  return(  
  <>
    {parts.map((part)=>(
      <Part info={part} key={part.id}/>
    ))}
  </>
  )
}

const Header = ({text}) => (
  <>
    <h2>{text}</h2>
  </>
)

const Total = ({parts}) => {
  const total = parts.reduce((acc, curr) => acc + curr.exercises, 0);
  return (
    <>
      <h3>Number of exercises {total}</h3>
    </>
  )
}

const Part = ({info}) => (
  <>
    <p>
      {info.name} {info.exercises}
    </p>
  </>
)

const Course = ({course}) => {
  return (
    <>
      <Header text={course.name}/>
      <Content parts={course.parts}/>
      <Total parts={course.parts}/>
    </>
  )
}

export default Course
