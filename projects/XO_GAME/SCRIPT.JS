// script.js
const board = document.getElementById('gameBoard');
const squares = document.querySelectorAll('.square');
const winnerMessage = document.getElementById('winnerMessage');
const resetButton = document.getElementById('resetButton');

let currentPlayer = 'X';
let gameActive = true;
let gameState = ['', '', '', '', '', '', '', '', ''];

const winningCombos = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
    [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
    [0, 4, 8], [2, 4, 6]             // Diagonals
];

// Handle square click
squares.forEach(square => {
    square.addEventListener('click', handleClick);
});

// Handle click event
function handleClick(event) {
    const index = event.target.getAttribute('data-index');

    if (gameState[index] !== '' || !gameActive) return;

    gameState[index] = currentPlayer;
    event.target.textContent = currentPlayer;

    if (checkWinner()) {
        winnerMessage.textContent = `${currentPlayer} Wins!`;
        gameActive = false;
    } else if (!gameState.includes('')) {
        winnerMessage.textContent = "It's a Draw!";
        gameActive = false;
    } else {
        currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
    }
}

// Check for a winner
function checkWinner() {
    return winningCombos.some(combo => {
        const [a, b, c] = combo;
        return gameState[a] && gameState[a] === gameState[b] && gameState[a] === gameState[c];
    });
}

// Reset the game
resetButton.addEventListener('click', () => {
    gameState = ['', '', '', '', '', '', '', '', ''];
    gameActive = true;
    currentPlayer = 'X';
    winnerMessage.textContent = '';
    squares.forEach(square => square.textContent = '');
});