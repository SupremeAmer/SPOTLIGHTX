function showLand() {
    const landSection = document.getElementById("land");
    const toolsSection = document.getElementById("tools");

    landSection.style.display = "block";
    toolsSection.style.display = "none";

    // Adding smooth fade-in effect
    landSection.style.opacity = 0;
    setTimeout(() => landSection.style.opacity = 1, 200);
}

function showTools() {
    const landSection = document.getElementById("land");
    const toolsSection = document.getElementById("tools");

    landSection.style.display = "none";
    toolsSection.style.display = "block";

    // Adding smooth fade-in effect
    toolsSection.style.opacity = 0;
    setTimeout(() => toolsSection.style.opacity = 1, 200);
}

// Web3 Wallet Payment Simulation with Confirmation
async function buyItem(item) {
    if (typeof window.ethereum !== "undefined") {
        try {
            const accounts = await ethereum.request({ method: "eth_requestAccounts" });
            const account = accounts[0];

            const transactionParameters = {
                to: "0xYourWalletAddress", // Replace with actual wallet address
                from: account,
                value: item === "land" ? "2000000000000000000" : "500000000000000000",
                data: "0x0"
            };

            const txHash = await ethereum.request({ method: "eth_sendTransaction", params: [transactionParameters] });

            alert(`Transaction Successful! TX Hash: ${txHash}`);
        } catch (error) {
            alert(`Transaction Failed: ${error.message}`);
        }
    } else {
        alert("No Wallet Found! Please connect your wallet.");
    }
}
