import React, {useState} from 'react';
import './App.css';
import classNames from 'classnames/bind';

const App = ()=> {
  const fields = new Array(9).fill(null);

  const [steps, setSteps] = useState([]);
  const lastStep = steps[steps.length - 1]?.value === "X" ? "0" : "X";
  const [player, setPlayer] = useState("X");
  const [winLines, setWinLines] = useState([]);
  const stepsObject = steps.reduce((acc, {index, value}) => {
    return {
      ...acc, [index]: value
    }
  }, {}) ;

const isEven = Object.keys(stepsObject).length % 2 === 0

  const clickHandler = (index)=> {
  if (winLines.length && isEven) {
          return false
      }

      const isChecked = stepsObject[index];

      const nextPlayer = lastStep === "X" ? "0": "X"

      if (isChecked) {
        return false
      }

    setSteps([...steps, {index, value: lastStep}])
    setPlayer(nextPlayer);
  }

  const GameFields = fields.map((field, index) => {

    const onClick = ()=> {
        clickHandler(index)
    }

    const value = stepsObject[index];
    let win = false;
     winLines.forEach((item) => {
        if(item.indexOf(index) >= 0 ? true : false) {
            win = true
        }

    })
    const btnClass = classNames({
            'square': true,
            'active': win
        });
    return <button key={index} className={btnClass} onClick={onClick}>
       {value} {win}
        </button>
  });


  const returnStepsNumber = (index) => {
    setSteps(steps.slice(0, index+1))
  }


  const renderStepsHistory = steps.map((item, index)=> {
  const onClick = ()=> returnStepsNumber(index);
    return (
        <li key={index}>
            <button onClick={onClick}>
                Move {index + 1}, player {item.value},
            </button>
        </li>
    )
  })

  const startNewGame = ()=> {
    setSteps([])
    setWinLines([])
  }

const result = calculateWinner(stepsObject);
const nextStep = winLines.length  ? false : calculateWinner(stepsObject);

if (nextStep.length >  0 && isEven) {
    setWinLines(result);
}

const stopGame = winLines.length > 0 && isEven;
const GameResult = winLines.length === 2 ? "Draw" : (winLines.length ? `Winner ${stepsObject[result?.[0]?.[0]]}` : "Keep playing");

  return (
      <div className="game">
          <div className='game-board'>
          {GameFields}
          </div>
          <div className='game-result'>
                <p>Next player: {player}</p>

                <ul>
                     {renderStepsHistory}
                </ul>


                <p><button onClick={startNewGame}>Start new game</button></p>

                {GameResult}


          </div>
      </div>
)
}

function calculateWinner(squares) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
  ];

 return lines.filter(([a, b, c]) => {
        return Boolean(squares[a]) && squares[a] === squares[b] && squares[b] === squares[c]
  })

}

export default App;
