import { useState } from 'react'
import './App.css'

const CHOICES = [
  { type: 'stone', icon: '🪨', label: 'STONE' },
  { type: 'paper', icon: '📄', label: 'PAPER' },
  { type: 'scissors', icon: '✂️', label: 'SCISSORS' }
]

function App() {
  const [userChoice, setUserChoice] = useState(null)
  const [computerChoice, setComputerChoice] = useState(null)
  const [result, setResult] = useState(null)
  const [score, setScore] = useState({ user: 0, computer: 0 })

  const determineWinner = (user, computer) => {
    if (user === computer) return 'tie'
    if (
      (user === 'stone' && computer === 'scissors') ||
      (user === 'paper' && computer === 'stone') ||
      (user === 'scissors' && computer === 'paper')
    ) {
      return 'user'
    }
    return 'computer'
  }

  const handleChoice = (type) => {
    const computer = CHOICES[Math.floor(Math.random() * CHOICES.length)].type
    setUserChoice(type)
    setComputerChoice(computer)

    const winner = determineWinner(type, computer)
    setResult(winner)

    if (winner !== 'tie') {
      setScore(prev => ({
        ...prev,
        [winner]: prev[winner] + 1
      }))
    }
  }

  const getEmoji = (type) => {
    return CHOICES.find(c => c.type === type)?.icon || '?'
  }

  return (
    <div>
      <h1>Computer:You</h1>

      <div className="score-container">
        <div className="score-item">Computer Score: {score.computer}</div>
        <div className="score-item">Your Score: {score.user}</div>
      </div>

      <div className="choice-row">
        {CHOICES.map((choice) => (
          <button
            key={choice.type}
            className="choice-btn"
            onClick={() => handleChoice(choice.type)}
          >
            <span className="choice-icon">{choice.icon}</span>
          </button>
        ))}
      </div>

      <div className="status-info">
        {userChoice && <div className="status-line">You chose: {getEmoji(userChoice)}</div>}
        {computerChoice && <div className="status-line">Computer chose: {getEmoji(computerChoice)}</div>}
      </div>

      {result && (
        <div className="result-text">
          {result === 'tie' && "It's a Tie"}
          {result === 'user' && "You Win"}
          {result === 'computer' && "Computer Wins"}
        </div>
      )}

      {(userChoice || computerChoice) && (
        <button className="reset-btn" onClick={() => {
          setUserChoice(null)
          setComputerChoice(null)
          setResult(null)
          setScore({ user: 0, computer: 0 })
        }}>
          Play Again
        </button>
      )}
    </div>
  )
}

export default App
