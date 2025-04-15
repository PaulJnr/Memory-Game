const cards = document.querySelectorAll('.memory-card');

let hasFlippedCard = false;
let lockBoard = false;
let firstCard, secondCard;

let scoreCount = 0;
let matchedPairs = 0;
const totalPairs = cards.length / 2; // 16 cards = 8 pairs
let moveCount = 0;

const scoreDisplay = document.getElementById('score');
const movesDisplay = document.getElementById('moves');
const restartButton = document.getElementById('restart');

function flipCard() {
    if (lockBoard) return;
    if (this === firstCard) return;

    this.classList.add('flip');

    if (!hasFlippedCard) {
        hasFlippedCard = true;
        firstCard = this;
        return;
    }

    secondCard = this;
    moveCount++;
    updateMoves();
    checkForMatch();
}

function checkForMatch() {
    let isMatch = firstCard.dataset.name === secondCard.dataset.name;
    isMatch ? disableCards() : unflipCards();
}

function disableCards() {
    firstCard.removeEventListener('click', flipCard);
    secondCard.removeEventListener('click', flipCard);
    updateScore();
    matchedPairs++;
    if (matchedPairs === totalPairs) {
        setTimeout(() => {
            alert("Great job! Restarting the game...");
            restartGame();
        }, 1000);
    }
    resetBoard();
}

function unflipCards() {
    lockBoard = true;
    setTimeout(() => {
        firstCard.classList.remove('flip');
        secondCard.classList.remove('flip');
        resetBoard();
    }, 1500);
}

function resetBoard() {
    [hasFlippedCard, lockBoard] = [false, false];
    [firstCard, secondCard] = [null, null];
}

function updateScore() {
    scoreCount++;
    scoreDisplay.textContent = scoreCount;
        }

function updateMoves() {
    movesDisplay.textContent = moveCount;
}

function shuffleCards() {
    cards.forEach(card => {
        let randomPos = Math.floor(Math.random() * cards.length);
        // console.log(cards.length);
        card.style.order = randomPos;
    });
}

function restartGame() {
    scoreCount = 0 -1;
    moveCount = 0;
    matchedPairs = 0; // reset match counter
    updateScore();
    updateMoves();
    resetBoard();

    cards.forEach(card => {
        card.classList.remove('flip');
        card.addEventListener('click', flipCard);
    });

    setTimeout(() => {
        shuffleCards();
    }, 500);
}

// Initial setup
shuffleCards();
cards.forEach(card => card.addEventListener('click', flipCard));
restartButton.addEventListener('click', restartGame);