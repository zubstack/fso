import { useState } from 'react'
import './App.css'


const StatLine = ({text, value}) => {
  return (
    <p><strong>{text}: </strong>{value}</p>
  )
}

const Stats = ({good, neutral, bad}) =>{
  const total = good + neutral + bad
  const average = total != 0 ? (good + (bad*(-1))) / total : 0
  const positive = total != 0 ? good/total : 0

  if(total == 0){
    return (
    <p>No stats to show yet.</p>
    )
  }

  return (
  <>
    <h1>statistics</h1>
    <StatLine text="good" value={good}/>
    <StatLine text="neutral" value={neutral}/>
    <StatLine text="bad" value={bad}/>
    <StatLine text="total" value={total}/>
    <StatLine text="average" value={average}/>
    <StatLine text="positive" value={`${positive*100}%`}/>
  </>
  )
}

const Header = () => {
  return (
    <h1>give feedback</h1>
  )
}

const Button = ({feedback, setFeedback, text}) =>{
  
  const handleFeedback = () =>{
    setFeedback(feedback + 1)
  }
  return (
    <button onClick={handleFeedback}>{text}</button>
  )
}

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  return (
    <div>
      <Header/>
      <Button feedback={good} text="good" setFeedback={setGood}/>
      <Button feedback={neutral} text="neutral" setFeedback={setNeutral}/>
      <Button feedback={bad} text="bad" setFeedback={setBad}/>
      <Stats good={good} neutral={neutral} bad={bad}/>
    </div>
  )
}

export default App
