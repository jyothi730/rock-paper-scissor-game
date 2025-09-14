import {Component} from 'react'
import Popup from 'reactjs-popup'
import {RiCloseLine} from 'react-icons/ri'
import Choiceitem from './components/Choiceitem'
import './App.css'

const choicesList = [
  {
    id: 'ROCK',
    imageUrl:
      'https://assets.ccbp.in/frontend/react-js/rock-paper-scissor/rock-image.png',
  },
  {
    id: 'SCISSORS',
    imageUrl:
      'https://assets.ccbp.in/frontend/react-js/rock-paper-scissor/scissor-image.png',
  },
  {
    id: 'PAPER',
    imageUrl:
      'https://assets.ccbp.in/frontend/react-js/rock-paper-scissor/paper-image.png',
  },
]

class App extends Component {
  state = {
    gameMode: '',
    scoreP1: 0,
    scoreP2: 0,
    turn: 'P1',
    choiceP1: null,
    choiceP2: null,
    result: '',
    gameView: false,
  }

  // compare logic
  getResult = (p1, p2, gameMode) => {
  if (p1.id === p2.id) return 'IT IS DRAW'

  if (
    (p1.id === 'ROCK' && p2.id === 'SCISSORS') ||
    (p1.id === 'SCISSORS' && p2.id === 'PAPER') ||
    (p1.id === 'PAPER' && p2.id === 'ROCK')
  ) {
    return 'PLAYER 1 WINS'
  }

  if (gameMode === '1P') {
    return 'COMPUTER WINS'
  }

  return 'PLAYER 2 WINS'
}


  // when user picks
  onClickChoice = id => {
    const {gameMode, turn, choiceP1, scoreP1, scoreP2} = this.state
    const choice = choicesList.find(each => each.id === id)

    if (gameMode === '1P') {
      // computer mode
      const computerChoice =
        choicesList[Math.floor(Math.random() * choicesList.length)]
      const result = this.getResult(choice, computerChoice, gameMode)
      let updatedP1 = scoreP1
      let updatedP2 = scoreP2

      if (result === 'PLAYER 1 WINS') updatedP1 += 1
      else if (result === 'COMPUTER WINS') updatedP2 += 1

      this.setState({
        choiceP1: choice,
        choiceP2: computerChoice,
        result,
        scoreP1: updatedP1,
        scoreP2: updatedP2,
        gameView: true,
      })
    } else {
      // 2-player mode
      if (turn === 'P1') {
        this.setState({choiceP1: choice, turn: 'P2'})
      } else {
        const result = this.getResult(choiceP1, choice, gameMode)
        let updatedP1 = scoreP1
        let updatedP2 = scoreP2
        if (result === 'PLAYER 1 WINS') updatedP1 += 1
        else if (result === 'PLAYER 2 WINS') updatedP2 += 1

        this.setState({
          choiceP2: choice,
          result,
          scoreP1: updatedP1,
          scoreP2: updatedP2,
          gameView: true,
        })
      }
    }
  }

  onClickPlayAgain = () => {
    this.setState({
      gameView: false,
      turn: 'P1',
      choiceP1: null,
      choiceP2: null,
      result: '',
    })
  }

  setGameMode = mode => {
    this.setState({gameMode: mode})
  }

  render() {
    const {
      gameMode,
      scoreP1,
      scoreP2,
      turn,
      choiceP1,
      choiceP2,
      result,
      gameView,
    } = this.state

    if (gameMode === '') {
      return (
        <div className="landing-container">
          <h1 className="main-heading">Rock Paper Scissors</h1>
          <p>Select Game Mode</p>
          <button
            className="mode-btn"
            type="button"
            onClick={() => this.setGameMode('1P')}
          >
            1 Player (vs Computer)
          </button>
          <button
            className="mode-btn"
            type="button"
            onClick={() => this.setGameMode('2P')}
          >
            2 Players
          </button>
        </div>
      )
    }

    return (
      <div className="app-container">
        <div className="score-card">
          <h1 className="main-heading">
            Rock <br /> Paper <br /> Scissors
          </h1>
          <div className="score-box">
            <p>Player 1 Score</p>
            <p className="score-value">{scoreP1}</p>
          </div>
          <div className="score-box">
            <p>{gameMode === '1P' ? 'Computer Score' : 'Player 2 Score'}</p>
            <p className="score-value">{scoreP2}</p>
          </div>
        </div>

        {!gameView ? (
          <div className="choices-container">
            <h2>
              {gameMode === '2P'
                ? turn === 'P1'
                  ? 'Player 1 Turn'
                  : 'Player 2 Turn'
                : 'Your Turn'}
            </h2>
            <div className="choices-wrapper">
            {choicesList.map(choice => (
              <Choiceitem
                key={choice.id}
                choice={choice}
                onClickChoice={this.onClickChoice}
              />
            ))}
            </div>
          </div>
        ) : (
          <div className="result-container">
            <div className="result-choices">
              <div>
                <h2>PLAYER 1</h2>
                <img
                  src={choiceP1.imageUrl}
                  alt="player1 choice"
                  className="img-after"
                />
              </div>
              <div>
                <h2>{gameMode === '1P' ? 'COMPUTER' : 'PLAYER 2'}</h2>
                <img
                  src={choiceP2.imageUrl}
                  alt="player2 choice"
                  className="img-after"
                />
              </div>
            </div>
            <p className="result-text">{result}</p>
            <button
              className="play-again-btn"
              onClick={this.onClickPlayAgain}
              type="button"
            >
              PLAY AGAIN
            </button>
          </div>
        )}

        <Popup
          modal
          trigger={
            <button type="button" className="rules-btn">
              Rules
            </button>
          }
        >
          {close => (
            <div className="rules-popup">
              <button className="close-btn" type="button" onClick={close}>
                <RiCloseLine />
              </button>
              <img
                src="https://assets.ccbp.in/frontend/react-js/rock-paper-scissor/rules-image.png"
                alt="rules"
                className="rules-img"
              />
            </div>
          )}
        </Popup>
      </div>
    )
  }
}

export default App
