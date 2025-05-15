const puzzleContainer = document.getElementById('puzzleContainer');
const timerElement = document.getElementById('timer');
const rewardElement = document.getElementById('reward');
const resetButton = document.getElementById('resetGame');
const leaderboardContainer = document.getElementById('leaderboard');
const themeSelector = document.getElementById('themeSelector');
const multiplayerButton = document.getElementById('multiplayerMode');
const chatPanel = document.createElement('div');
const chatToggle = document.createElement('button');
const chatMessages = document.createElement('div');
const chatInput = document.createElement('input');
const chatSendButton = document.createElement('button');

let timer = 0;
let pieces = [];
let shuffledPieces = [];
let interval;
let draggedPiece = null;
let playerName = prompt("Enter your name for the leaderboard:");
createPuzzle(); 
const coinPieces = [ "p1.png", "p2.png",
                    "p3.png", "p4.png", 
                    "p5.png", "p6.png", 
                    "p7.png", "p8.png",
                    "p9.png" ];

const socket = new WebSocket("wss://yourserver.com/multiplayer");

// 🎨 **Chat Panel Styling**
chatPanel.id = "chatPanel";
chatPanel.style.position = "fixed";
chatPanel.style.right = "-300px";
chatPanel.style.width = "280px";
chatPanel.style.height = "400px";
chatPanel.style.background = "rgba(0, 0, 0, 0.8)";
chatPanel.style.color = "#fff";
chatPanel.style.padding = "15px";
chatPanel.style.transition = "right 0.3s ease-in-out";

chatToggle.innerText = "💬 Chat";
chatToggle.style.position = "fixed";
chatToggle.style.right = "5px";
chatToggle.style.bottom = "20px";
chatToggle.style.background = "#007bff";
chatToggle.style.color = "#fff";
chatToggle.style.padding = "10px";
chatToggle.style.border = "none";
chatToggle.style.cursor = "pointer";
chatToggle.style.opacity = "0.5";
chatToggle.style.transition = "opacity 0.3s ease-in-out";
chatToggle.addEventListener("mouseover", () => chatToggle.style.opacity = "1");
chatToggle.addEventListener("mouseleave", () => chatToggle.style.opacity = "0.5");

chatMessages.style.height = "300px";
chatMessages.style.overflowY = "auto";

chatInput.placeholder = "Type your message...";
chatSendButton.innerText = "Send";
chatSendButton.style.marginTop = "10px";

chatPanel.appendChild(chatMessages);
chatPanel.appendChild(chatInput);
chatPanel.appendChild(chatSendButton);
document.body.appendChild(chatPanel);
document.body.appendChild(chatToggle);

// 🔄 **Toggle Chat Panel**
chatToggle.addEventListener("click", () => {
    chatPanel.style.right = chatPanel.style.right === "5px" ? "-300px" : "5px";
});

// 🎮 **WebSocket Messaging**
chatSendButton.addEventListener("click", () => {
    let message = chatInput.value;
    if (message.trim() !== "") {
        socket.send(JSON.stringify({ player: playerName, message }));
        chatInput.value = "";
    }
});

socket.onmessage = (event) => {
    let data = JSON.parse(event.data);
    let messageElement = document.createElement("p");
    messageElement.innerText = `${data.player}: ${data.message}`;
    messageElement.style.animation = "fadeIn 0.3s ease-in-out";
    
    // 🔥 **Emoji Support**
    messageElement.innerHTML = messageElement.innerText.replace(":)", "😊").replace(":D", "😁").replace("<3", "❤️");

    chatMessages.appendChild(messageElement);
    chatMessages.scrollTop = chatMessages.scrollHeight;
    
    let audio = new Audio("sounds/message-ping.mp3");
    audio.play();
};

// 🏆 **Leaderboards & Puzzle System**
function updateLeaderboard(player, time) {
    let entry = document.createElement("p");
    entry.innerText = `${player} - ${time} seconds`;
    leaderboardContainer.appendChild(entry);
    entry.style.transition = "transform 0.5s ease-in-out";
    entry.style.transform = "scale(1.2)";
    setTimeout(() => entry.style.transform = "scale(1)", 500);
}

function checkWin() {
    return pieces.every((piece, index) => piece.style.backgroundImage.includes(`piece${index + 1}.png`));
}

// 🔄 **Reset Game**
resetButton.addEventListener("click", createPuzzle);

// 🚀 **Initialize Game on Load**
createPuzzle();
