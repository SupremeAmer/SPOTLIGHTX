
const contractAddress = 'YOUR_CONTRACT_ADDRESS';
const contractAbi = [...]; // Your contract ABI
const tokenContract = new web3.eth.Contract(contractAbi, contractAddress);

let balance = parseFloat(localStorage.getItem('balance')) || 0;
let receivingWalletAddress = localStorage.getItem('receivingWalletAddress') || '';
let userAddress = localStorage.getItem('userAddress') || '';
let privateKey = localStorage.getItem('privateKey') || '';

document.getElementById('balance').textContent = balance.toFixed(2);

if (receivingWalletAddress) {
  document.getElementById('receiving-wallet-address').value = receivingWalletAddress;
}

document.getElementById('withdraw-btn').addEventListener('click', async () => {
  try {
    const withdrawAmount = parseFloat(document.getElementById('withdraw-amount').value);
    if (isNaN(withdrawAmount) || withdrawAmount <= 0) {
      throw new Error('Invalid withdrawal amount');
    }

    if (balance < withdrawAmount) {
      throw new Error('Insufficient balance');
    }

    if (balance < 100000) {
      throw new Error('Minimum balance requirement not met');
    }

    if (!web3.utils.isAddress(receivingWalletAddress)) {
      throw new Error('Invalid receiving wallet address');
    }

    const txCount = await web3.eth.getTransactionCount(userAddress);
    const tx = {
      from: userAddress,
      to: contractAddress,
      value: 0,
      gas: '20000',
      gasPrice: web3.utils.toWei('20', 'gwei'),
      nonce: txCount,
      data: tokenContract.methods.transfer(receivingWalletAddress, web3.utils.toWei(withdrawAmount.toString())).encodeABI(),
    };

    const signedTx = await web3.eth.accounts.signTransaction(tx, privateKey);
    const receipt = await web3.eth.sendSignedTransaction(signedTx.rawTransaction);

    if (receipt.status === true) {
      balance -= withdrawAmount;
      localStorage.setItem('balance', balance);
      document.getElementById('balance').textContent = balance.toFixed(2);
      document.getElementById('withdraw-status').textContent = 'Withdrawal processed successfully!';
    } else {
      throw new Error('Transaction failed');
    }
  } catch (error) {
    document.getElementById('withdraw-status').textContent = error.message;
  }
});

document.getElementById('save-wallet-address-btn').addEventListener('click', () => {
  try {
    receivingWalletAddress = document.getElementById('receiving-wallet-address').value;
    if (!web3.utils.isAddress(receivingWalletAddress)) {
      throw new Error('Invalid receiving wallet address');
    }
    localStorage.setItem('receivingWalletAddress', receivingWalletAddress);
    document.getElementById('wallet-address-status').textContent = 'Wallet address saved successfully!';
  } catch (error) {
    document.getElementById('wallet-address-status').textContent = error.message;
  }
});

  document.addEventListener('DOMContentLoaded', () => {
    const balance = localStorage.getItem('balance');
    if (document.getElementById('balance')) {
      document.getElementById('balance').textContent = balance;
    }
  });

 
