// Global variables to store contract and web3 instances
let contract;
let web3;
let userAccount;

// Contract address where the SimpleStorage contract is deployed
const contractAddress = "0xfe9f3167d87656bcbbbb29b5b1578cbc9ddf8f5f";

// Contract ABI (Application Binary Interface) - defines how to interact with the contract
const contractABI = [ 
  {
    "inputs": [{ "internalType": "uint256", "name": "_number", "type": "uint256" }],
    "name": "setNumber",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "getNumber",
    "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }],
    "stateMutability": "view",
    "type": "function"
  }
];

// Function to update wallet connection status
function updateWalletStatus(connected, account = null) {
  const walletStatus = document.getElementById('walletStatus');
  if (connected) {
    walletStatus.className = 'connected';
    walletStatus.textContent = `Wallet Status: Connected (${account.slice(0, 6)}...${account.slice(-4)})`;
  } else {
    walletStatus.className = 'disconnected';
    walletStatus.textContent = 'Wallet Status: Not Connected';
  }
}

// Function to connect wallet
async function connectWallet() {
  if (window.ethereum) {
    try {
      // Request account access
      const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
      userAccount = accounts[0];
      
      // Initialize Web3
      web3 = new Web3(window.ethereum);
      
      // Initialize contract
      contract = new web3.eth.Contract(contractABI, contractAddress);
      
      // Update UI
      updateWalletStatus(true, userAccount);
      console.log("Wallet connected successfully!");
      
      // Listen for account changes
      window.ethereum.on('accountsChanged', function (accounts) {
        userAccount = accounts[0];
        updateWalletStatus(true, userAccount);
      });
      
      // Listen for chain changes
      window.ethereum.on('chainChanged', function () {
        window.location.reload();
      });
      
    } catch (error) {
      console.error("Error connecting wallet:", error);
      updateWalletStatus(false);
    }
  } else {
    alert("Please install MetaMask to use this DApp!");
    updateWalletStatus(false);
  }
}

// Event listener for connect wallet button
document.getElementById('connectWallet').addEventListener('click', connectWallet);

// Function to set a new number in the contract
async function setNumber() {
  if (!userAccount) {
    alert("Please connect your wallet first!");
    return;
  }
  
  try {
    const number = document.getElementById("numberInput").value;
    await contract.methods.setNumber(number).send({ from: userAccount });
    alert("Number stored successfully!");
  } catch (error) {
    console.error("Error setting number:", error);
    alert("Error setting number. Please try again.");
  }
}

// Function to get the stored number from the contract
async function getNumber() {
  if (!userAccount) {
    alert("Please connect your wallet first!");
    return;
  }
  
  try {
    const result = await contract.methods.getNumber().call();
    document.getElementById("result").innerText = "Stored number: " + result;
  } catch (error) {
    console.error("Error getting number:", error);
    alert("Error getting number. Please try again.");
  }
} 