import { useState } from 'react'
import viteLogo from '/vite.svg'

const Content = (props) => {
  console.log(props.parts)
  return(  
  <>
    <Part info={props.parts[0]}/>
    <Part info={props.parts[1]}/>
    <Part info={props.parts[2]}/>
  </>
  )
}

const Header = (props) => (
  <>
    <h1>{props.course}</h1>
  </>
)

const Total = (props) => {
  const total = props.parts.reduce((acc, curr) => acc + curr.exercises, 0);
  return (
    <>
      <p>Number of exercises {total}</p>
    </>
  )
}

const Part = (props) => (
  <>
    <p>
      {props.info.name} {props.info.exercises}
    </p>
  </>
)


const App = () => {
  const course = {
    name:'Half Stack application development',
    parts : [
      {name:'Fundamentals of React', exercises:10}, 
      {name:'Using props to pass data', exercises:7}, 
      {name:'State of a component', exercises:14}
    ]
  }

  return (
    <div>
      <Header course={course.name}/>
      <Content parts={course.parts}/>
      <Total parts={course.parts}/>
    </div>
  )
}

export default App
