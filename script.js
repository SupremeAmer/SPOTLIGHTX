document.addEventListener('DOMContentLoaded', function() {
    const startButton = document.getElementById('startMining');
    const progressBar = document.getElementById('progressBar');
    const balanceElement = document.getElementById('balance');
    const upgradeSpeedButton = document.getElementById('upgradeSpeed');

    let miningData = JSON.parse(localStorage.getItem('miningData')) || {
        miningSpeed: 0.05,
        balance: 0,
        remainingTime: 14400 // Default 4 hours
    };

    document.body.style.backgroundImage = `url(${miningData.background})`;

    let miningSpeed = miningData.miningSpeed;
    let balance = miningData.balance;
    let remainingTime = miningData.miningPeriod;
    let isMining = false;

    function updateBalance() {
        balance += miningSpeed;
        balanceElement.textContent = balance.toFixed(2);
        miningData.balance = balance;
        localStorage.setItem('miningData', JSON.stringify(miningData));
    }

    function updateProgress() {
        let percent = (remainingTime / miningData.miningPeriod) * 100;
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
                    miningData.remainingTime = remainingTime;
                    localStorage.setItem('miningData', JSON.stringify(miningData));
                    updateBalance();
                    updateProgress();
                }
            }, 1000);
        }
    }

    function upgradeMiningSpeed() {
        miningSpeed *= 2;
        miningData.miningSpeed = miningSpeed;
        localStorage.setItem('miningData', JSON.stringify(miningData));
    }

    startButton.addEventListener('click', startMining);
    upgradeSpeedButton.addEventListener('click', upgradeMiningSpeed);

    balanceElement.textContent = balance.toFixed(2);
    updateProgress();
});
