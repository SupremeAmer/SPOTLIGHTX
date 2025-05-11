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