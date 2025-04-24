import { useState } from 'react'

const Title = ({ text }) => <h1>{text}</h1>

const Button = ({ handleClick,text }) => {
    return (
        <button onClick={handleClick}>
            {text}
        </button>
    )
}

const StatisticLine = ({ text, value }) => {
  if(text === "positive"){
    return <tr><td>{text}</td><td> {value} %</td></tr>
  }
    return <tr><td>{text}</td><td> {value}</td></tr>
}

const Statistics = ({ good,neutral,bad,all,average,positive }) => {
  return (
    <table>
      <tbody>
        <StatisticLine text="good" value={good} />
        <StatisticLine text="neutral" value={neutral} />
        <StatisticLine text="bad" value={bad} />
        <StatisticLine text="all" value={all} />
        <StatisticLine text="average" value={average} />
        <StatisticLine text="positive" value={positive} />
      </tbody>
    </table>
  )
}

const App = () => {
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const handleGoodClick = () => {
    setGood(good + 1)
  }

  const handleNeutralClick = () => {
    setNeutral(neutral + 1)
  }

  const handleBadClick = () => {
    setBad(bad + 1)
  }

  const all = good + neutral + bad
  const average = all === 0? 0 : (good - bad) / all
  const positive = all === 0? 0 : (good / all) * 100

  return (
    <div>
      <Title text="Give feedback" />
      <Button handleClick={handleGoodClick} text="good" />
      <Button handleClick={handleNeutralClick} text="neutral" />
      <Button handleClick={handleBadClick} text="bad" />
      <Title text="Statistics" />
      {all === 0 
      ? <p>No feedback given</p> 
      : <Statistics good={good} neutral={neutral} bad={bad} all={all} average={average} positive={positive}/>}
    </div>
  )
}

export default App