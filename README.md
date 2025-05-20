# Simple Storage DApp

A decentralized application that demonstrates the interaction between a frontend web application and an Ethereum smart contract using Web3.js and MetaMask.

## 📋 Project Structure

```
simple-storage-dapp/
│
├── contracts/
│   └── SimpleStorage.sol    # Smart contract for storing numbers
├── index.html              # Frontend interface
├── script.js              # Frontend logic and Web3 integration
└── README.md              # This documentation
```

## 🔗 Frontend-Smart Contract Connection

### 1. Smart Contract (Backend)
The `SimpleStorage.sol` contract provides two main functions:
- `setNumber(uint256 _number)`: Stores a number on the blockchain
- `getNumber()`: Retrieves the stored number

### 2. Frontend Components

#### HTML Interface (`index.html`)
- Provides user interface elements:
  - Input field for entering numbers
  - "Set Number" button to store numbers
  - "Get Stored Number" button to retrieve numbers
  - Display area for showing the stored number

#### JavaScript Integration (`script.js`)
The frontend connects to the smart contract through several key components:

1. **Web3.js Integration**
   ```javascript
   // Initialize Web3 with MetaMask provider
   web3 = new Web3(window.ethereum);
   ```

2. **Contract Connection**
   ```javascript
   // Contract address and ABI
   const contractAddress = "YOUR_DEPLOYED_CONTRACT_ADDRESS";
   const contractABI = [...];  // Contract interface
   
   // Initialize contract instance
   contract = new web3.eth.Contract(contractABI, contractAddress);
   ```

3. **MetaMask Integration**
   - Checks for MetaMask installation
   - Requests user account access
   - Handles transaction signing

## 🔄 Data Flow

1. **Setting a Number**
   ```javascript
   // 1. User enters number in input field
   // 2. Clicks "Set Number" button
   // 3. Frontend calls contract method
   await contract.methods.setNumber(number).send({ from: accounts[0] });
   // 4. MetaMask prompts for transaction confirmation
   // 5. Transaction is mined on blockchain
   // 6. Success message shown to user
   ```

2. **Getting a Number**
   ```javascript
   // 1. User clicks "Get Stored Number" button
   // 2. Frontend calls contract method
   const result = await contract.methods.getNumber().call();
   // 3. Result displayed on webpage
   document.getElementById("result").innerText = "Stored number: " + result;
   ```

## 🚀 Setup Instructions

1. **Deploy Smart Contract**
   - Use Remix IDE to deploy `SimpleStorage.sol`
   - Copy the deployed contract address
   - Update `contractAddress` in `script.js`

2. **Run Frontend**
   - Ensure MetaMask is installed in your browser
   - Open `index.html` in a web browser
   - Connect MetaMask when prompted

## 🔧 Technical Requirements

- MetaMask browser extension
- Web3.js library
- Modern web browser
- Ethereum network connection (testnet or mainnet)

## 🔐 Security Considerations

1. **MetaMask Security**
   - Never share your private keys
   - Always verify transaction details
   - Use test networks for development

2. **Contract Security**
   - Smart contract is immutable once deployed
   - Ensure thorough testing before deployment
   - Consider gas costs for transactions

## 📚 Additional Resources

- [Web3.js Documentation](https://web3js.readthedocs.io/)
- [MetaMask Documentation](https://docs.metamask.io/)
- [Solidity Documentation](https://docs.soliditylang.org/)
- [Ethereum Development Documentation](https://ethereum.org/developers/)

## 🤝 Contributing

Feel free to submit issues and enhancement requests! 