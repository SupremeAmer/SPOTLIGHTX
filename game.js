const words = [
    "bitcoin", "blockchain", "steganography", "nft", "clandestine", "secret",
    "furtive", "covert", "hide", "stock", "mining", "website", "concealment"
];

let level = 1;
let score = 0;
let selectedLetters = [];
let wordGrid = document.getElementById("wordGrid");
let rewardDisplay = document.getElementById("reward");

function shuffleLetters(word) {
    return word.split("").sort(() => Math.random() - 0.5);
}

function createWordGrid() {
    wordGrid.innerHTML = "";
    let currentWord = words[level - 1];
    let scrambled = shuffleLetters(currentWord);

    scrambled.forEach(letter => {
        let letterElement = document.createElement("div");
        letterElement.classList.add("letter");
        letterElement.textContent = letter;
        letterElement.addEventListener("click", () => selectLetter(letter));
        wordGrid.appendChild(letterElement);
    });
}

function selectLetter(letter) {
    selectedLetters.push(letter);
    let formedWord = selectedLetters.join("");

    if (words.includes(formedWord)) {
        let rewardPoints = Math.floor(Math.random() * (50000 - 100) + 100);
        score += rewardPoints;
        rewardDisplay.textContent = score;
        selectedLetters = [];
        levelUp();
    }
}

function levelUp() {
    level++;
    if (level <= words.length) {
        document.getElementById("level").textContent = level;
        createWordGrid();
    } else {
        wordGrid.innerHTML = "<p>🎉 You’ve completed all levels! 🎉</p>";
    }
}

document.getElementById("resetGame").addEventListener("click", () => {
    level = 1;
    score = 0;
    rewardDisplay.textContent = score;
    createWordGrid();
});
let currentPlayer = localStorage.getItem("currentPlayer") || "";

document.getElementById("loginButton").addEventListener("click", function () {
    let playerName = document.getElementById("playerName").value.trim();
    if (playerName) {
        currentPlayer = playerName;
        localStorage.setItem("currentPlayer", currentPlayer);
        document.getElementById("welcomeMessage").textContent = `Welcome, ${currentPlayer}!`;
    }
});

function updateLeaderboard(score) {
    let leaderboardData = JSON.parse(localStorage.getItem("leaderboard")) || [];
    leaderboardData.push({ player: currentPlayer, score });
    leaderboardData.sort((a, b) => b.score - a.score);
    localStorage.setItem("leaderboard", JSON.stringify(leaderboardData));
    displayLeaderboard();
}

window.onload = function () {
    if (currentPlayer) {
        document.getElementById("welcomeMessage").textContent = `Welcome back, ${currentPlayer}!`;
    }
};


window.onload = createWordGrid;
