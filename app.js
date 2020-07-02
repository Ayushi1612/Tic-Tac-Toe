const X_CLASS = 'x'
const CIRCLE_CLASS = 'circle'
const WINNING_COMBINATIONS = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6]
]
const cellElements = document.querySelectorAll('[data-cell]')
const board = document.getElementById('board')
  const winningMessageElement = document.getElementById('winningMessage')
  const restartButton = document.getElementById('restartButton')
  const winningMessageTextElement = document.querySelector('[data-winning-message-text]')
let circleTurn

startGame()

restartButton.addEventListener('click', startGame)

function startGame() {
  circleTurn = false
  cellElements.forEach(cell => {
      //to restart
    cell.classList.remove(X_CLASS)
    cell.classList.remove(CIRCLE_CLASS)
    cell.removeEventListener('click', handleClick)
    //to check clicks(start checking game)
    cell.addEventListener('click', handleClick, { once: true })
  })
  setBoardHoverClass()
  //to restart
  winningMessageElement.classList.remove('show')
}

function handleClick(e) {
  const cell = e.target
  const currentClass = circleTurn ? CIRCLE_CLASS : X_CLASS
  placeMark(cell, currentClass)
  if (checkWin(currentClass)) {
      //wehther or not its a draw -- here its win
    endGame(false)
  } else if (isDraw()) {
      //its a draw
    endGame(true)
  } else {
      //game is still going therefore swap turns
    swapTurns()
    setBoardHoverClass()
  }
}

function endGame(draw) {
  if (draw) {
    winningMessageTextElement.innerText = 'Draw!'
  } else {
    winningMessageTextElement.innerText = `${circleTurn ? "O's" : "X's"} Wins!`
  }
  winningMessageElement.classList.add('show')
}

function isDraw() {
    //if every single cell has either x or o its a draw and this funtion will return true
  return [...cellElements].every(cell => {
    return cell.classList.contains(X_CLASS) || cell.classList.contains(CIRCLE_CLASS)
  })
}

function placeMark(cell, currentClass) {
  cell.classList.add(currentClass)
}

function swapTurns() {
  circleTurn = !circleTurn
}

function setBoardHoverClass() {
  board.classList.remove(X_CLASS)
  board.classList.remove(CIRCLE_CLASS)
  if (circleTurn) {
    board.classList.add(CIRCLE_CLASS)
  } else {
    board.classList.add(X_CLASS)
  }
}



function checkWin(currentClass){
    //returns true if any of the combination is met it will loop over all the cellelements
    return WINNING_COMBINATIONS.some(combination =>{
        //check if all the cell values have same class i.e X or O
        return combination.every(index =>{
            //checks if current turn (X/O) is in all the cell elements of the combination
            return cellElements[index].classList.contains(currentClass)
            console.log('yes')
        })
    })
  }