function showLand() {
    document.getElementById("land").style.display = "block";
    document.getElementById("tools").style.display = "none";
}

function showTools() {
    document.getElementById("land").style.display = "none";
    document.getElementById("tools").style.display = "block";
}

// Web3 Wallet Payment Simulation
async function buyItem(item) {
    if (typeof window.ethereum !== "undefined") {
        const accounts = await ethereum.request({ method: "eth_requestAccounts" });
        const account = accounts[0];

        const transactionParameters = {
            to: "0xYourWalletAddress", // Replace with actual wallet address
            from: account,
            value: item === "land" ? "2000000000000000000" : "500000000000000000",
            data: "0x0"
        };

        await ethereum.request({ method: "eth_sendTransaction", params: [transactionParameters] });
        alert("Transaction Initiated!");
    } else {
        alert("No Wallet Found!");
    }
}
