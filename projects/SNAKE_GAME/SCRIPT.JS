// script.js
const gameArea = document.getElementById('gameArea');
const scoreElement = document.getElementById('score');

const gameSize = 30; // 30x30 grid
let snake = [{ x: 5, y: 5 }]; // Initial snake position
let food = { x: 10, y: 10 };
let direction = 'right';
let score = 0;
let gameInterval;

// Draw the snake and food
function draw() {
    gameArea.innerHTML = ''; // Clear the game area

    // Draw snake
    snake.forEach(segment => {
        const snakeElement = document.createElement('div');
        snakeElement.classList.add('snake');
        snakeElement.style.left = `${segment.x * gameSize}px`;
        snakeElement.style.top = `${segment.y * gameSize}px`;
        gameArea.appendChild(snakeElement);
    });

    // Draw food
    const foodElement = document.createElement('div');
    foodElement.classList.add('food');
    foodElement.style.left = `${food.x * gameSize}px`;
    foodElement.style.top = `${food.y * gameSize}px`;
    gameArea.appendChild(foodElement);
}

// Move the snake
function moveSnake() {
    const head = { ...snake[0] };

    switch (direction) {
        case 'up': head.y -= 1; break;
        case 'down': head.y += 1; break;
        case 'left': head.x -= 1; break;
        case 'right': head.x += 1; break;
    }

    // Check collisions
    if (head.x < 0 || head.x >= 30 || head.y < 0 || head.y >= 30 || collision(head)) {
        clearInterval(gameInterval);
        alert('Game Over! Your score: ' + score);
        resetGame();
        return;
    }

    snake.unshift(head);

    // Check if food is eaten
    if (head.x === food.x && head.y === food.y) {
        score += 10;
        scoreElement.textContent = score;
        spawnFood();
    } else {
        snake.pop(); // Remove tail if no food eaten
    }

    draw();
}

// Check if the snake collides with itself
function collision(head) {
    return snake.some((segment, index) => index !== 0 && segment.x === head.x && segment.y === head.y);
}

// Spawn food at random position
function spawnFood() {
    food = {
        x: Math.floor(Math.random() * 30),
        y: Math.floor(Math.random() * 30)
    };
}

// Handle key presses
document.addEventListener('keydown', event => {
    const key = event.key;
    if (key === 'ArrowUp' && direction !== 'down') direction = 'up';
    if (key === 'ArrowDown' && direction !== 'up') direction = 'down';
    if (key === 'ArrowLeft' && direction !== 'right') direction = 'left';
    if (key === 'ArrowRight' && direction !== 'left') direction = 'right';
});

// Start the game
function startGame() {
    score = 0;
    scoreElement.textContent = score;
    snake = [{ x: 5, y: 5 }];
    direction = 'right';
    spawnFood();

    gameInterval = setInterval(moveSnake, 150);
}

function resetGame() {
    clearInterval(gameInterval);
    startGame();
}

startGame();
