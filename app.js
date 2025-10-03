import { isConnected, setAllowed, getAddress } from "@stellar/freighter-api";
import { Server } from "stellar-sdk";

const connectButton = document.getElementById('connectButton');
const statusDiv = document.getElementById('status');
const addressDiv = document.getElementById('addressDisplay');

const server = new Server("https://horizon-testnet.stellar.org");

// Function to update the UI based on connection status
const updateUI = async () => {
    const connected = await isConnected();
    if (connected.isConnected) {
        try {
            const publicKeyObj = await getAddress();
            const publicKey = publicKeyObj.address;

            // Fetch XLM balance from Horizon testnet
            const account = await server.accounts().accountId(publicKey).call();
            const balance = account.balances.find(b => b.asset_type === "native").balance;

            statusDiv.textContent = 'Status: Connected';
            addressDiv.textContent = `Public Key: ${publicKey} | XLM Balance: ${balance}`;
        } catch (error) {
            console.error("Error getting address or balance:", error);
            statusDiv.textContent = 'Status: Connected (could not fetch balance)';
            addressDiv.textContent = '';
        }
    } else {
        statusDiv.textContent = 'Status: Not Connected';
        addressDiv.textContent = '';
    }
};

// Handle the button click to connect the wallet
connectButton.addEventListener('click', async () => {
    try {
        await setAllowed(); // Prompts the user to authorize your app
        updateUI(); // Refresh the UI after connecting
    } catch (error) {
        console.error("Error connecting to Freighter:", error);
        statusDiv.textContent = 'Status: Connection Failed';
        addressDiv.textContent = '';
    }
});

// Initial check when the page loads
updateUI();
