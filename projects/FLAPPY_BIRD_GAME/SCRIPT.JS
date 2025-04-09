const bird = document.getElementById('bird');
const gameContainer = document.getElementById('game-container');
const pipeContainer = document.getElementById('pipe-container');
const scoreDisplay = document.getElementById('score');

let birdY = 250;
let gravity = 0.5;
let velocity = 0;
let score = 0;
let pipes = [];

function updateBird() {
    velocity += gravity;
    birdY += velocity;
    bird.style.top = birdY + 'px';

    // Game over if the bird hits the top or bottom
    if (birdY < 0 || birdY > 570) {
        gameOver();
    }
}

function jump() {
    velocity = -10; // Adjust jump height
}

function createPipes() {
    const pipeHeight = Math.floor(Math.random() * 200) + 100;
    const pipeTop = document.createElement('div');
    const pipeBottom = document.createElement('div');

    pipeTop.classList.add('pipe', 'pipe-top');
    pipeBottom.classList.add('pipe', 'pipe-bottom');

    pipeTop.style.height = pipeHeight + 'px';
    pipeBottom.style.height = 600 - pipeHeight - 150 + 'px'; // Gap between pipes

    pipeContainer.appendChild(pipeTop);
    pipeContainer.appendChild(pipeBottom);

    pipes.push({
        top: pipeTop,
        bottom: pipeBottom,
        x: 400, // Starting position
    });
}

function movePipes() {
    pipes.forEach((pipePair, index) => {
        pipePair.x -= 3; // Pipe speed
        pipePair.top.style.left = pipePair.x + 'px';
        pipePair.bottom.style.left = pipePair.x + 'px';

        // Collision detection (simplified)
        if (pipePair.x < 130 && pipePair.x > 50 &&
            (birdY < pipePair.top.offsetHeight || birdY + 30 > 600 - pipePair.bottom.offsetHeight)) {
            gameOver();
        }

        if (pipePair.x < -50) {
            pipeContainer.removeChild(pipePair.top);
            pipeContainer.removeChild(pipePair.bottom);
            pipes.splice(index, 1);
            score++;
            scoreDisplay.textContent = 'Score: ' + score;
        }
    });

    if (pipes.length === 0 || pipes[pipes.length-1].x < 200){
        createPipes();
    }
}

function gameOver() {
    clearInterval(gameLoop);
    alert('Game Over! Score: ' + score);
}

document.addEventListener('click', jump);

const gameLoop = setInterval(() => {
    updateBird();
    movePipes();
}, 20); // Adjust game speed