import { useState, useEffect } from 'react'
import './App.css'
import { deadOrAlive, generateInitialBoard, tick } from './grid'
import { Board } from './Board'

const gameBoard = generateInitialBoard(deadOrAlive)

function App() {
  const [board, setBoard] = useState(gameBoard)
  const [inputValue, setInputValue] = useState("150")
  const [speed, setSpeed] = useState(150)
  const [pause, setPause] = useState(false)

  useEffect(() => {
    const intervalId = setInterval(() => {
      setBoard(prev => tick(prev))
    }, speed)

    return () => {
      clearInterval(intervalId)
    }
  }, [setBoard, speed])

  const handleChange = (e) => {
    setInputValue(e.target.value)
  }

  const handleClick = () => {
    setSpeed(parseInt(inputValue))
  }

  const resetGame = () => {
    setBoard(generateInitialBoard(deadOrAlive))
    setSpeed(150)
  }

  const handlePause = () => {
    if (!pause) {
      setSpeed(999999)
      setPause(true)
    } else {
      setSpeed(150)
      setPause(false)
    }
  }

  return (
    <div className="main">
      <div className="controls">
        <input type="number" onChange={handleChange} value={inputValue} />
        <button onClick={handleClick}>Set Speed</button>
        <button onClick={resetGame}>Reset Game</button>
        <button onClick={handlePause}>{pause ? 'Unpause Game' : 'Pause Game'}</button>
      </div>
      <Board gameBoard={board} />
    </div>
  )
}

export default App
