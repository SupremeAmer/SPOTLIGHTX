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

    const timerElement = document.getElementById("timer");
    const startButton = document.getElementById("startButton");
    const claimButton = document.getElementById("claimButton");

    // Disable the start button
    startButton.classList.add("disabled");
    startButton.disabled = true;

    // Update the timer every second
    timerInterval = setInterval(() => {
        if (remainingTime <= 0) {
            clearInterval(timerInterval);
            isMining = false;
            miningCompleted = true;
            timerElement.textContent = "Mining Completed! You can now claim your tokens.";
            claimButton.classList.remove("disabled");
            claimButton.disabled = false;
        } else {
            const hours = Math.floor(remainingTime / 3600);
            const minutes = Math.floor((remainingTime % 3600) / 60);
            const seconds = remainingTime % 60;
            timerElement.textContent = `Mining in Progress: ${hours}h ${minutes}m ${seconds}s`;
            remainingTime--;
        }
    }, 1000);
}

function claimTokens() {
    if (!miningCompleted) {
        alert("Mining is not yet completed. Please wait for the timer to finish.");
        return;
    }

    // Simulate claiming tokens (e.g., adding to balance)
    const balanceElement = document.getElementById("balance");
    const claimAmount = 50.000; // Example value
    const currentBalance = parseFloat(balanceElement.textContent);
    balanceElement.textContent = (currentBalance + claimAmount).toFixed(3);

    // Reset state
    miningCompleted = false;
    const startButton = document.getElementById("startButton");
    const claimButton = document.getElementById("claimButton");
    const timerElement = document.getElementById("timer");

    // Update buttons
    startButton.classList.remove("disabled");
    startButton.disabled = false;
    claimButton.classList.add("disabled");
    claimButton.disabled = true;

    // Reset timer
    timerElement.textContent = "Mining Status: Not Started";
}


class SupremeAmerToken {
    constructor(user, miningRatePerSecond, miningDurationInHours) {
        this.user = user;
        this.miningRatePerSecond = miningRatePerSecond; // $SA earned per second
        this.miningDurationInHours = miningDurationInHours; // Total mining duration in hours
        this.totalTokenEarned = 0;
        this.miningStartTime = null;
        this.miningInterval = null;
    }

    // Start the mining process
    startMining() {
        console.log(`Welcome ${this.user}, your mining session is starting!`);
        this.miningStartTime = new Date();
        const miningDurationInSeconds = this.miningDurationInHours * 60 * 60;

        this.miningInterval = setInterval(() => {
            this.totalTokenEarned += this.miningRatePerSecond;
            console.log(`Mining in progress... Total $SA earned: ${this.totalTokenEarned.toFixed(8)}`);
        }, 1000);

        // Stop mining after the specified duration
        setTimeout(() => {
            this.stopMining();
        }, miningDurationInSeconds * 1000);
    }

    // Stop the mining process
    stopMining() {
        clearInterval(this.miningInterval);
        console.log(`Mining session ended! Total $SA earned: ${this.totalTokenEarned.toFixed(8)}`);
    }
}

// Example usage
const user = "SupremeAmer";
const miningRatePerSecond = 0.00008; // $SA per second
const miningDurationInHours = 5; // 5 hours of mining

const supremeAmerTokenMining = new SupremeAmerToken(user, miningRatePerSecond, miningDurationInHours);
supremeAmerTokenMining.startMining();
