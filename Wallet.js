

let isMining = false;
let miningCompleted = false;
let timerInterval;
const miningDuration = 3 * 60 * 60; // 3 hours in seconds
let remainingTime = miningDuration;

function startMining() {
    if (isMining || miningCompleted) {
        alert("You need to claim mined tokens before starting mining again.");
        return;
    }

    isMining = true;
    remainingTime = miningDuration;

    const startButton = document.getElementById("startButton");
    const claimButton = document.getElementById("claimButton");
    const balanceElement = document.getElementById("miningBalance");

    // Disable the start button
    startButton.disabled = true;

    // Update the timer every second
    timerInterval = setInterval(() => {
        if (remainingTime <= 0) {
            clearInterval(timerInterval);
            isMining = false;
            miningCompleted = true;
            claimButton.disabled = false;
            balanceElement.textContent = parseFloat(balanceElement.textContent) + 50.000; // Example mined amount
        } else {
            remainingTime--;
        }
    }, 1000);
}

function claimTokens() {
    if (!miningCompleted) {
        alert("Mining is not yet completed. Please wait for the timer to finish.");
        return;
    }

    alert("Tokens claimed successfully!");
    miningCompleted = false;

    // Enable the start button
    document.getElementById("startButton").disabled = false;

    // Reset claim button
    const claimButton = document.getElementById("claimButton");
    claimButton.disabled = true;
}
