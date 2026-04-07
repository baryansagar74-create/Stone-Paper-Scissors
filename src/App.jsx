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
  const [rounds, setRounds] = useState(0)
  const [history, setHistory] = useState([])
  const [streak, setStreak] = useState(0)

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
    const winner = determineWinner(type, computer)
    
    setUserChoice(type)
    setComputerChoice(computer)
    setResult(winner)
    setRounds(prev => prev + 1)
    
    // Update score and streak
    if (winner === 'user') {
      setScore(prev => ({ ...prev, user: prev.user + 1 }))
      setStreak(prev => prev + 1)
    } else if (winner === 'computer') {
      setScore(prev => ({ ...prev, computer: prev.computer + 1 }))
      setStreak(0)
    } else {
      setStreak(0)
    }

    // Update history
    setHistory(prev => [
      { 
        id: Date.now(),
        user: type, 
        computer: computer, 
        result: winner === 'tie' ? 'Tie' : winner === 'user' ? 'Win' : 'Loss' 
      },
      ...prev
    ].slice(0, 10)) // Keep last 10 rounds
  }

  const resetAll = () => {
    setUserChoice(null)
    setComputerChoice(null)
    setResult(null)
    setScore({ user: 0, computer: 0 })
    setRounds(0)
    setHistory([])
    setStreak(0)
  }

  const playAgain = () => {
    setUserChoice(null)
    setComputerChoice(null)
    setResult(null)
  }

  const getEmoji = (type) => {
    return CHOICES.find(c => c.type === type)?.icon || '?'
  }

  return (
    <div className="container">
      <h1>Computer:You</h1>
      
      <div className="stats-dashboard">
        <div className="stat-box">
          <span className="stat-label">Rounds Played</span>
          <span className="stat-value">{rounds}</span>
        </div>
        <div className="stat-box">
          <span className="stat-label">Win Streak</span>
          <span className="stat-value streak-active">{streak}🔥</span>
        </div>
      </div>

      <div className="score-container">
        <div className="score-item">Computer Score: {score.computer}</div>
        <div className="score-item">Your Score: {score.user}</div>
        <button className="reset-all-btn" onClick={resetAll}>Reset Game</button>
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
        <div className="result-area">
          <div className="result-text">
            {result === 'tie' && "It's a Tie"}
            {result === 'user' && "You Win!"}
            {result === 'computer' && "Computer Wins"}
          </div>
          <button className="reset-btn" onClick={playAgain}>
            Next Round
          </button>
        </div>
      )}

      {history.length > 0 && (
        <div className="history-section">
          <h2>Move History</h2>
          <div className="history-list">
            {history.map((round) => (
              <div key={round.id} className={`history-item result-${round.result.toLowerCase()}`}>
                <span>{getEmoji(round.user)} vs {getEmoji(round.computer)}</span>
                <span className="round-outcome">{round.result}</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

export default App
