const puzzleContainer = document.getElementById('puzzleContainer');
const timerElement = document.getElementById('timer');
const rewardElement = document.getElementById('reward');
const resetButton = document.getElementById('resetGame');

let timer = 0;
let pieces = [];
let shuffledPieces = [];
let interval;

// Start timer
function startTimer() {
    interval = setInterval(() => {
        timer++;
        timerElement.innerText = timer;
    }, 1000);
}

// Stop timer
function stopTimer() {
    clearInterval(interval);
}

// Generate puzzle pieces
function createPuzzle() {
    let positions = [...Array(9).keys()];
    shuffledPieces = positions.sort(() => Math.random() - 0.5);
    shuffledPieces.forEach((pos, index) => {
        let piece = document.createElement('div');
        piece.classList.add('puzzle-piece');
        piece.style.backgroundImage = `url('coin_part${pos + 1}.png')`;
        piece.setAttribute('data-pos', pos);
        piece.draggable = true;
        piece.addEventListener('dragstart', dragStart);
        piece.addEventListener('drop', drop);
        piece.addEventListener('dragover', allowDrop);
        puzzleContainer.appendChild(piece);
        pieces.push(piece);
    });
    startTimer();
}

// Drag and drop events
function dragStart(e) {
    e.dataTransfer.setData('text', e.target.dataset.pos);
}

function allowDrop(e) {
    e.preventDefault();
}

function drop(e) {
    e.preventDefault();
    let draggedPos = e.dataTransfer.getData('text');
    let targetPos = e.target.dataset.pos;

    if (draggedPos !== targetPos) {
        let draggedPiece = pieces.find(p => p.dataset.pos === draggedPos);
        let targetPiece = pieces.find(p => p.dataset.pos === targetPos);

        let tempBg = draggedPiece.style.backgroundImage;
        draggedPiece.style.backgroundImage = targetPiece.style.backgroundImage;
        targetPiece.style.backgroundImage = tempBg;

        if (checkWin()) {
            stopTimer();
            rewardElement.innerText = Math.floor(10 / timer); // Reward based on speed
            alert("Puzzle Completed! You earned SupremeAmer Coins.");
        }
    }
}

// Check win condition
function checkWin() {
    return pieces.every((piece, index) => piece.dataset.pos == index);
}

// Reset game
resetButton.addEventListener('click', () => {
    puzzleContainer.innerHTML = "";
    pieces = [];
    timer = 0;
    timerElement.innerText = 0;
    rewardElement.innerText = 0;
    stopTimer();
    createPuzzle();
});

// Initialize puzzle
createPuzzle();
