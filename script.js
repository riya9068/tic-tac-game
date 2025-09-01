const board = document.getElementById("board");
const message = document.getElementById("message");
let currentPlayer = "X";
let cells = Array(9).fill(null);
let gameActive = true;

// Create the 3x3 board
function createBoard() {
  board.innerHTML = "";
  for (let i = 0; i < 9; i++) {
    const cell = document.createElement("div");
    cell.className = "cell";
    cell.dataset.index = i;
    cell.addEventListener("click", handleClick);
    board.appendChild(cell);
  }
}

// Handle cell click
function handleClick(e) {
  const index = e.target.dataset.index;
  if (!gameActive || cells[index]) return;

  cells[index] = currentPlayer;
  e.target.textContent = currentPlayer;

  if (checkWinner()) {
    message.textContent = `Player ${currentPlayer} wins! 🎉`;
    gameActive = false;
  } else if (cells.every(cell => cell)) {
    message.textContent = "It's a draw!";
    gameActive = false;
  } else {
    currentPlayer = currentPlayer === "X" ? "O" : "X";
    message.textContent = `Player ${currentPlayer}'s turn`;
  }
}

// Check for winner
function checkWinner() {
  const winCombos = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8],  // rows
    [0, 3, 6], [1, 4, 7], [2, 5, 8],  // columns
    [0, 4, 8], [2, 4, 6]              // diagonals
  ];

  return winCombos.some(combo => {
    const [a, b, c] = combo;
    return cells[a] && cells[a] === cells[b] && cells[a] === cells[c];
  });
}

// Reset the game
function resetGame() {
  currentPlayer = "X";
  cells = Array(9).fill(null);
  gameActive = true;
  message.textContent = "Player X's turn";
  createBoard();
}

// Start game
resetGame();
