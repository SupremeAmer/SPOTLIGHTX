const startButton = document.getElementById('startMining');
const progressBar = document.getElementById('progressBar');
const balanceElement = document.getElementById('balance');
const upgradeSpeedButton = document.getElementById('upgradeSpeed');

let miningSpeed = 0.05; 
let balance = parseFloat(localStorage.getItem('miningBalance')) || 0;
let remainingTime = parseFloat(localStorage.getItem('remainingTime')) || 14400; // 4 hours in seconds
let isMining = false;

function updateBalance() {
    balance += miningSpeed;
    balanceElement.textContent = balance.toFixed(2);
    localStorage.setItem('miningBalance', balance);
}

function updateProgress() {
    let percent = (remainingTime / 14400) * 100;
    progressBar.style.width = percent + "%";
}

function startMining() {
    if (!isMining && remainingTime > 0) {
        isMining = true;
        const miningInterval = setInterval(() => {
            if (remainingTime <= 0) {
                clearInterval(miningInterval);
                isMining = false;
            } else {
                remainingTime--;
                localStorage.setItem('remainingTime', remainingTime);
                updateBalance();
                updateProgress();
            }
        }, 1000); // Mining every second
    }
}

function upgradeMiningSpeed() {
    miningSpeed *= 2;
}

startButton.addEventListener('click', startMining);
upgradeSpeedButton.addEventListener('click', upgradeMiningSpeed);

balanceElement.textContent = balance.toFixed(2);
updateProgress();



document.addEventListener('DOMContentLoaded', function() {
    const completeTaskBtn = document.getElementById('completeTask');
    const miningBalanceDisplay = document.getElementById('balance');

    let balance = parseFloat(localStorage.getItem('miningBalance')) || 0;

    completeTaskBtn.addEventListener('click', () => {
        completeTaskBtn.disabled = true;
        setTimeout(() => {
            balance += 0.5;
            localStorage.setItem('miningBalance', balance);
            miningBalanceDisplay.textContent = balance.toFixed(2);
        }, 5000);
    });

    miningBalanceDisplay.textContent = balance.toFixed(2);
});
