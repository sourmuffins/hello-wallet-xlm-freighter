document.getElementById("connect").onclick = async () => {
  if (!window.freighterApi) {
    alert("Freighter is not installed or not detected.");
    return;
  }

  try {
    // Ask Freighter for the public key on TESTNET
    const publicKey = await window.freighterApi.getPublicKey("TESTNET");
    document.getElementById("address").innerText = "Address: " + publicKey;

    // Fetch account balances from Horizon testnet
    const response = await fetch(
      `https://horizon-testnet.stellar.org/accounts/${publicKey}`
    );
    const account = await response.json();

    const balance = account.balances.find(b => b.asset_type === "native").balance;
    document.getElementById("balance").innerText = "XLM Balance: " + balance;
  } catch (err) {
    console.error("Wallet connection failed:", err);
    alert("Error connecting to wallet: " + err.message);
  }
};
