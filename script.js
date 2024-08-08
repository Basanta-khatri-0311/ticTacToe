let board = ['', '', '', '', '', '', '', '', '']
let currentPlayer = 'X'
let isGameActive = true

const winConditions = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6]
]

const cells = document.querySelectorAll('.cell')
const gameStatus = document.querySelector('.game-status')
const resetButton = document.querySelector('.reset')


function startGame() {
  cells.forEach(cell => cell.addEventListener('click', cellClicked))
  resetButton.addEventListener('click', resetGame)
  gameStatus.textContent = `Player ${currentPlayer} turn`
}

function cellClicked() {
  const cellIndex = this.getAttribute('index')

  if (board[cellIndex] !== '' || !isGameActive) {
    return
  }
  updateBoard(this, cellIndex)
  checkForWinner()
}

function updateBoard(cell, index) {
  board[index] = currentPlayer
  cell.textContent = currentPlayer
  currentPlayer = currentPlayer === 'X' ? 'O' : 'X'
  gameStatus.textContent = `Player ${currentPlayer}'s turn`
}

function checkForWinner() {
  let roundWon = false
  for (let i = 0; i < winConditions.length; i++) {
    const [a, b, c] = winConditions[i]
    if (board[a] && board[a] === board[b] && board[a] === board[c]) {
      roundWon = true
      break
    }
  }

  if (roundWon) {
    gameStatus.textContent = `Player ${currentPlayer === 'X' ? 'O' : 'X'} Wins!!!`
    isGameActive = false
    return
  }
  if (!board.includes('')) {
    gameStatus.textContent = 'Game is Draw!!'
    isGameActive = false
    return
  }
}

function resetGame() {
  board = ['', '', '', '', '', '', '', '', '']
  isGameActive = true
  currentPlayer = 'X'
  gameStatus.textContent = `Player ${currentPlayer}'s turn`
  cells.forEach(cell => (cell.textContent = ''))
}


startGame()
