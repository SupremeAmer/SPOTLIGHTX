import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-app.js";
import { getDatabase, ref, set, onValue } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-database.js";

// Firebase configuration
const firebaseConfig = {
    apiKey: "YOUR_API_KEY",
    authDomain: "YOUR_PROJECT.firebaseapp.com",
    databaseURL: "https://YOUR_PROJECT.firebaseio.com",
    projectId: "YOUR_PROJECT",
    storageBucket: "YOUR_PROJECT.appspot.com",
    messagingSenderId: "YOUR_MESSAGING_ID",
    appId: "YOUR_APP_ID"
};

const app = initializeApp(firebaseConfig);
const db = getDatabase(app);
const leaderboardRef = ref(db, "leaderboard");

// Function to update leaderboard in Firebase
function updateLeaderboard(player, score) {
    set(ref(db, "leaderboard/" + player), { player, score });
}

// Function to listen for updates
onValue(leaderboardRef, (snapshot) => {
    const data = snapshot.val();
    displayLeaderboard(data);
});

// Display Leaderboard
function displayLeaderboard(data) {
    let leaderboardTable = document.getElementById("leaderboard");
    leaderboardTable.innerHTML = "<tr><th>Rank</th><th>Player</th><th>Score</th></tr>";

    let sortedPlayers = Object.values(data).sort((a, b) => b.score - a.score);
    sortedPlayers.forEach((entry, index) => {
        let row = leaderboardTable.insertRow();
        row.insertCell(0).textContent = index + 1;
        row.insertCell(1).textContent = entry.player;
        row.insertCell(2).textContent = entry.score;
    });
}
const emojiRef = ref(db, "emojiReactions");

document.getElementById("emojiButton").addEventListener("click", function () {
    push(emojiRef, { player: currentPlayer, emoji: "😀" });
});

onChildAdded(emojiRef, (snapshot) => {
    let data = snapshot.val();
    let chatWindow = document.getElementById("chatWindow");
    let emojiElement = document.createElement("p");
    emojiElement.textContent = `${data.player} reacted with ${data.emoji}`;
    chatWindow.appendChild(emojiElement);
});


import { getDatabase, ref, push, onChildAdded } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-database.js";

const chatRef = ref(db, "chat");

// Sending messages
document.getElementById("sendMessage").addEventListener("click", function () {
    let message = document.getElementById("chatMessage").value.trim();
    if (message) {
        push(chatRef, { player: currentPlayer, text: message });
        document.getElementById("chatMessage").value = "";
    }
});

// Listening for messages
onChildAdded(chatRef, (snapshot) => {
    let data = snapshot.val();
    let chatWindow = document.getElementById("chatWindow");
    let messageElement = document.createElement("p");
    messageElement.textContent = `${data.player}: ${data.text}`;
    chatWindow.appendChild(messageElement);
});


document.getElementById("findOpponent").addEventListener("click", function () {
    document.getElementById("opponentMessage").textContent = "Searching for an opponent...";
    
    setTimeout(() => {
        let opponent = ["SupremeAlpha", "CryptoMaster", "StegoLegend"][Math.floor(Math.random() * 3)];
        document.getElementById("opponentMessage").textContent = `Matched with ${opponent}! Start playing!`;
    }, 2000);
});

let localStream;
let peerConnection;

document.getElementById("startVoiceChat").addEventListener("click", async function () {
    localStream = await navigator.mediaDevices.getUserMedia({ audio: true });
    peerConnection = new RTCPeerConnection();
    peerConnection.addTrack(localStream.getAudioTracks()[0]);
});

document.getElementById("stopVoiceChat").addEventListener("click", function () {
    localStream.getTracks().forEach(track => track.stop());
});




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
