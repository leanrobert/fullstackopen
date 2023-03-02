import { useState } from 'react'

const Statistics = (props) => {
  return(
    <div>
      <h1>statistics</h1>
      {props.sum === 0 ? (
        <p>No feedback given</p>
      ): (
        <table>
          <tbody>
            <StatisticLine text="good" value={props.good} />
            <StatisticLine text="neutral" value={props.neutral} />
            <StatisticLine text="bad" value={props.bad} />
            <StatisticLine text="all" value={props.sum} />
            <StatisticLine text="average" value={props.avg} />
            <StatisticLine text="positive" value={props.positive} />
          </tbody>
        </table>
      )}
    </div>
  )
}

const Button = (props) => {
  return(
    <button onClick={props.onClick}>{props.text}</button>
  )
}

const StatisticLine = (props) => {
  return(
    <tr>
      <td>{props.text}</td>
      <td>{props.value}</td>
    </tr>
  )
}

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const sum = good + neutral + bad
  const avg = Math.round((good - bad) / sum * 100) / 100
  const positive = Math.round(good / sum * 100 * 100) / 100 + " %"

  const handleGood = () => {
    setGood(good + 1)
  }

  const handleNeutral = () => {
    setNeutral(neutral + 1)
  }

  const handleBad = () => {
    setBad(bad + 1)
  }

  return (
    <div>
      <h1>give feedback</h1>
      <div>
        <Button onClick={handleGood} text="good" />
        <Button onClick={handleNeutral} text="neutral" />
        <Button onClick={handleBad} text="bad" />
      </div>

      <Statistics good={good} neutral={neutral} bad={bad} sum={sum} avg={avg} positive={positive} />
    </div>
  )
}

export default App