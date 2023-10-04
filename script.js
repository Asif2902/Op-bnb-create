const web3 = new Web3("https://bsc-dataseed1.binance.org:443");  // Binance Smart Chain RPC endpoint
const contractAddress = "0x1ddeaa3ead136a70d6d52c99cfd9e336babccac1";  // Your contract address

const abi = [
  {
    "constant": true,
    "inputs": [],
    "name": "creationFee",
    "outputs": [
      {
        "name": "",
        "type": "uint256"
      }
    ],
    "payable": false,
    "stateMutability": "view",
    "type": "function"
  },
  {
    "constant": true,
    "inputs": [],
    "name": "tokenCreators",
    "outputs": [
      {
        "name": "",
        "type": "address"
      }
    ],
    "payable": false,
    "stateMutability": "view",
    "type": "function"
  },
  {
    "constant": true,
    "inputs": [
      {
        "name": "",
        "type": "address"
      }
    ],
    "name": "tokenDecimals",
    "outputs": [
      {
        "name": "",
        "type": "uint8"
      }
    ],
    "payable": false,
    "stateMutability": "view",
    "type": "function"
  },
  {
    "constant": true,
    "inputs": [],
    "name": "owner",
    "outputs": [
      {
        "name": "",
        "type": "address"
      }
    ],
    "payable": false,
    "stateMutability": "view",
    "type": "function"
  },
  {
    "constant": true,
    "inputs": [
      {
        "name": "",
        "type": "address"
      }
    ],
    "name": "tokenCreators",
    "outputs": [
      {
        "name": "",
        "type": "address"
      }
    ],
    "payable": false,
    "stateMutability": "view",
    "type": "function"
  },
  {
    "constant": true,
    "inputs": [
      {
        "name": "",
        "type": "address"
      }
    ],
    "name": "tokenDecimals",
        "outputs": [
      {
        "name": "",
        "type": "uint8"
      }
    ],
    "payable": false,
    "stateMutability": "view",
    "type": "function"
  },
  {
    "constant": false,
    "inputs": [
      {
        "name": "fee",
        "type": "uint256"
      }
    ],
    "name": "setCreationFee",
    "outputs": [],
    "payable": false,
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "constant": false,
    "inputs": [
      {
        "name": "newOwner",
        "type": "address"
      }
    ],
    "name": "transferOwnership",
    "outputs": [],
    "payable": false,
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "constant": false,
    "inputs": [
      {
        "name": "tokenAddress",
        "type": "address"
      },
      {
        "name": "amount",
        "type": "uint256"
      }
    ],
    "name": "mintToken",
    "outputs": [],
    "payable": false,
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "constant": false,
    "inputs": [],
    "name": "renounceOwnership",
    "outputs": [],
    "payable": false,
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "constant": false,
    "inputs": [
      {
        "name": "name",
        "type": "string"
      },
      {
        "name": "symbol",
        "type": "string"
      },
      {
        "name": "decimals",
        "type": "uint8"
      },
      {
        "name": "initialSupply",
        "type": "uint256"
      }
    ],
    "name": "createToken",
    "outputs": [],
    "payable": true,
    "stateMutability": "payable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "name": "previousOwner",
        "type": "address",
        "indexed": true
      },
      {
        "name": "newOwner",
        "type": "address",
        "indexed": true
      }
    ],
    "payable": false,
    "stateMutability": "nonpayable",
    "type": "constructor"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "name": "previousOwner",
        "type": "address",
        "indexed": true
      },
      {
        "name": "newOwner",
        "type": "address",
        "indexed": true
      }
    ],
    "name": "OwnershipTransferred",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "name": "creator",
        "type": "address",
        "indexed": true
      },
      {
        "name": "tokenAddress",
        "type": "address",
        "indexed": true
      }
    ],
    "name": "TokenCreated",
    "type": "event"
  }
];

async function connectWallet() {
  if (window.BinanceChain) {
    try {
      await window.BinanceChain.request({ method: 'eth_requestAccounts' });
      console.log('Connected to Binance Smart Chain wallet!');
    } catch (error) {
      console.error('Error connecting to Binance Smart Chain wallet:', error);
    }
  } else {
    console.error('Binance Smart Chain wallet not found. Please install Trust Wallet or Coinbase Wallet.');
  }
}

const connectWalletButton = document.getElementById('connectWalletButton');
connectWalletButton.addEventListener('click', connectWallet);

async function createToken() {
  const name = document.getElementById('name').value;
  const symbol = document.getElementById('symbol').value;
  const decimals = document.getElementById('decimals').value;
  const initialSupply = document.getElementById('initialSupply').value;

  const deployedContract = new web3.eth.Contract(abi, contractAddress);
  await deployedContract.methods.createToken(name, symbol, decimals, initialSupply)
    .send({ from: window.BinanceChain.selectedAddress, value: web3.utils.toWei('0.0001', 'ether') });
}

const createTokenButton = document.getElementById('createTokenButton');
createTokenButton.addEventListener('click', createToken);

async function mintToken() {
  const tokenAddress = document.getElementById('tokenAddress').value;
  const amountToMint = document.getElementById('amountToMint').value;

  const deployedContract = new web3.eth.Contract(abi, contractAddress);
  await deployedContract.methods.mintToken(tokenAddress, amountToMint)
    .send({ from: window.BinanceChain.selectedAddress });
}

const mintTokenButton = document.getElementById('mintTokenButton');
mintTokenButton.addEventListener('click', mintToken);
