// script.js
const gridContainer = document.getElementById('gridContainer');
const scoreElement = document.getElementById('score');

let grid = [
    [0, 0, 0, 0],
    [0, 0, 0, 0],
    [0, 0, 0, 0],
    [0, 0, 0, 0]
];

let score = 0;

// Create grid cells
function createGrid() {
    gridContainer.innerHTML = '';
    for (let i = 0; i < 4; i++) {
        for (let j = 0; j < 4; j++) {
            const cell = document.createElement('div');
            cell.classList.add('grid-cell');
            cell.setAttribute('id', `cell-${i}-${j}`);
            gridContainer.appendChild(cell);
        }
    }
    updateGrid();
}

// Update grid with values
function updateGrid() {
    for (let i = 0; i < 4; i++) {
        for (let j = 0; j < 4; j++) {
            const cell = document.getElementById(`cell-${i}-${j}`);
            const value = grid[i][j];
            cell.textContent = value !== 0 ? value : '';
            cell.className = 'grid-cell';
            if (value !== 0) {
                cell.classList.add(`grid-cell-${value}`);
            }
        }
    }
    scoreElement.textContent = `Score: ${score}`;
}

// Add a new number (2 or 4)
function addNewNumber() {
    const emptyCells = [];
    for (let i = 0; i < 4; i++) {
        for (let j = 0; j < 4; j++) {
            if (grid[i][j] === 0) {
                emptyCells.push({ x: i, y: j });
            }
        }
    }
    if (emptyCells.length > 0) {
        const randomCell = emptyCells[Math.floor(Math.random() * emptyCells.length)];
        grid[randomCell.x][randomCell.y] = Math.random() > 0.9 ? 4 : 2;
    }
    updateGrid();
}

// Move and merge tiles
function move(direction) {
    let moved = false;
    if (direction === 'left') {
        for (let i = 0; i < 4; i++) {
            let row = grid[i].filter(num => num !== 0);
            for (let j = 0; j < row.length - 1; j++) {
                if (row[j] === row[j + 1]) {
                    row[j] *= 2;
                    score += row[j];
                    row[j + 1] = 0;
                }
            }
            grid[i] = row.filter(num => num !== 0).concat([0, 0, 0, 0].slice(0, 4 - row.length));
        }
    }
    // Handle other directions (right, up, down) similarly...
    addNewNumber();
    updateGrid();
}

// Handle key presses
document.addEventListener('keydown', (event) => {
    if (event.key === 'ArrowLeft') move('left');
    // Add other directions (ArrowRight, ArrowUp, ArrowDown)
});

// Initialize the game
createGrid();
addNewNumber();
