window.onload = () => {
  document.getElementById("connect").onclick = async () => {
    if (!window.freighterApi) {
      alert("Freighter is not installed or not detected.");
      return;
    }

    try {
      const publicKey = await window.freighterApi.getPublicKey({ network: "TESTNET" });
      document.getElementById("address").innerText = "Address: " + publicKey;

      const response = await fetch(`https://horizon-testnet.stellar.org/accounts/${publicKey}`);
      const account = await response.json();

      const balance = account.balances.find(b => b.asset_type === "native").balance;
      document.getElementById("balance").innerText = "XLM Balance: " + balance;
    } catch (err) {
      console.error("Wallet connection failed:", err);
      alert("Error connecting to wallet: " + err.message);
    }
  };
};

