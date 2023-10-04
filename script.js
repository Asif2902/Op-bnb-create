const contractAddress = "0x1ddeaa3ead136a70d6d52c99cfd9e336babccac1"; // Replace with your contract address
const contractABI = [{"name":"OwnershipTransferred","type":"event","inputs":[{"name":"previousOwner","type":"address","indexed":true,"internalType":"address"},{"name":"newOwner","type":"address","indexed":true,"internalType":"address"}],"anonymous":false,"signature":"0x8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e0"},{"name":"TokenCreated","type":"event","inputs":[{"name":"creator","type":"address","indexed":true,"internalType":"address"},{"name":"tokenAddress","type":"address","indexed":true,"internalType":"address"}],"anonymous":false,"signature":"0xd5f9bdf12adf29dab0248c349842c3822d53ae2bb4f36352f301630d018c8139"},{"name":"createToken","type":"function","inputs":[{"name":"name","type":"string","internalType":"string"},{"name":"symbol","type":"string","internalType":"string"},{"name":"decimals","type":"uint8","internalType":"uint8"},{"name":"initialSupply","type":"uint256","internalType":"uint256"}],"outputs":[],"payable":true,"signature":"0x210f5dda","stateMutability":"payable"},{"name":"creationFee","type":"function","inputs":[],"outputs":[{"name":"","type":"uint256","value":"100000000000000","internalType":"uint256"}],"constant":true,"signature":"0xdce0b4e4","stateMutability":"view"},{"name":"mintToken","type":"function","inputs":[{"name":"tokenAddress","type":"address","internalType":"address"},{"name":"amount","type":"uint256","internalType":"uint256"}],"outputs":[],"signature":"0x79c65068","stateMutability":"nonpayable"},{"name":"owner","type":"function","inputs":[],"outputs":[{"name":"","type":"address","value":"0x7d9Cb2994D86B6a4e65761B5d81DADa69ce54a7f","internalType":"address"}],"constant":true,"signature":"0x8da5cb5b","stateMutability":"view"},{"name":"renounceOwnership","type":"function","inputs":[],"outputs":[],"signature":"0x715018a6","stateMutability":"nonpayable"},{"name":"setCreationFee","type":"function","inputs":[{"name":"fee","type":"uint256","internalType":"uint256"}],"outputs":[],"signature":"0xb7d86225","stateMutability":"nonpayable"},{"name":"tokenCreators","type":"function","inputs":[{"name":"","type":"address","internalType":"address"}],"outputs":[{"name":"","type":"address","internalType":"address"}],"constant":true,"signature":"0xce7e8de8","stateMutability":"view"},{"name":"tokenDecimals","type":"function","inputs":[{"name":"","type":"address","internalType":"address"}],"outputs":[{"name":"","type":"uint8","internalType":"uint8"}],"constant":true,"signature":"0x8ee573ac","stateMutability":"view"},{"name":"transferOwnership","type":"function","inputs":[{"name":"newOwner","type":"address","internalType":"address"}],"outputs":[],"signature":"0xf2fde38b","stateMutability":"nonpayable"},{"name":"withdraw","type":"function","inputs":[],"outputs":[],"signature":"0x3ccfd60b","stateMutability":"nonpayable"},{"type":"receive","payable":true,"stateMutability":"payable"}]let web3;
let contract;

const expectedChainId = 0xcc; // Binance Smart Chain Mainnet chain ID

async function connectWallet() {
  if (typeof window.ethereum !== 'undefined') {
    try {
      // Prompt user to connect wallet
      await window.ethereum.request({ method: 'eth_requestAccounts' });
      web3 = new Web3(window.ethereum);
      contract = new web3.eth.Contract(contractABI, contractAddress);

      // Check if the user is on the correct chain
      const chainId = await web3.eth.getChainId();
      if (chainId !== expectedChainId) {
        alert('Please switch to the Binance Smart Chain network in MetaMask.');
        return;
      }

      // Enable UI elements after successful wallet connection
      enableUI();
      alert('Wallet connected!');
    } catch (error) {
      alert('Wallet connection failed. Please try again.');
      console.error(error);
    }
  } else {
    alert('MetaMask or a compatible wallet is required to connect.');
  }
}

function enableUI() {
  document.getElementById('name').removeAttribute('disabled');
  document.getElementById('symbol').removeAttribute('disabled');
  document.getElementById('decimals').removeAttribute('disabled');
  document.getElementById('initialSupply').removeAttribute('disabled');
  document.getElementById('tokenAddress').removeAttribute('disabled');
  document.getElementById('mintAmount').removeAttribute('disabled');
  document.getElementById('createTokenBtn').removeAttribute('disabled');
  document.getElementById('mintTokenBtn').removeAttribute('disabled');
}

async function createToken() {
  const name = document.getElementById("name").value;
  const symbol = document.getElementById("symbol").value;
  const decimals = document.getElementById("decimals").value;
  const initialSupply = document.getElementById("initialSupply").value;

  const accounts = await web3.eth.getAccounts();
  
  await contract.methods.createToken(name, symbol, decimals, initialSupply)
    .send({ from: accounts[0], value: web3.utils.toWei('0.0001', 'ether') });

  alert('Token created!');
}

async function mintToken() {
  const tokenAddress = document.getElementById("tokenAddress").value;
  const mintAmount = document.getElementById("mintAmount").value;

  const accounts = await web3.eth.getAccounts();
  
  await contract.methods.mintToken(tokenAddress, mintAmount)
    .send({ from: accounts[0] });

  alert('Tokens minted!');
}
