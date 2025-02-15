const gameArea = document.getElementById('gameArea');
const player = document.getElementById('player');
const scoreDisplay = document.getElementById('score');
let score = 0;
let playerPosition = 175; // Initial position of the player
const memes = ['meme1.png.jpg', 'meme2.png.jpg', 'meme3.png.jpg']; // Add your meme image paths here

document.addEventListener('keydown', (event) => {
    if (event.key === 'ArrowLeft' && playerPosition > 0) {
        playerPosition -= 15;
    } else if (event.key === 'ArrowRight' && playerPosition < 350) {
        playerPosition += 15;
    }
    player.style.left = playerPosition + 'px';
});

function createMeme() {
    const meme = document.createElement('img');
    meme.src = memes[Math.floor(Math.random() * memes.length)];
    meme.classList.add('meme');
    meme.style.left = Math.random() * 350 + 'px';
    gameArea.appendChild(meme);
    moveMeme(meme);
}

function moveMeme(meme) {
    let memePosition = 0;
    const fallInterval = setInterval(() => {
        if (memePosition > 600) {
            clearInterval(fallInterval);
            gameArea.removeChild(meme);
        } else {
            memePosition += 5;
            meme.style.top = memePosition + 'px';

            // Check for collision
            if (memePosition > 550 && memePosition < 600 && 
                parseInt(meme.style.left) >= playerPosition - 25 && 
                parseInt(meme.style.left) <= playerPosition + 25) {
                score++;
                scoreDisplay.innerText = 'Score: ' + score;
                clearInterval(fallInterval);
                gameArea.removeChild(meme);
            }
        }
    }, 20);
}

setInterval(createMeme, 1000);