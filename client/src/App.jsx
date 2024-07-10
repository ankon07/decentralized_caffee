import { useState, useEffect } from 'react';
import { ethers } from 'ethers';
import abi from "./contractJson/chai.json";
import Memos from "./components/Memos";
import Buy from "./components/Buy";
import chai from "./chai.png"; // Ensure the correct path to your image
import './App.css';
import GetBalance from './components/GetBalance';

function App() {
  const [state, setState] = useState({
    provider: null,
    signer: null,
    contract: null,
  });
  const [account, setAccount] = useState('Not Connected');

  useEffect(() => {
    const template = async () => {
      const contractAddress = "0x6f1DC1612027A08b162a51273Da686a9B9e76eD9"; // Add your contract address here
      const contractABI = abi.abi; // Add your contract ABI here

      try {
        const { ethereum } = window;

        if (!ethereum) {
          alert("Please install Metamask!");
          return;
        }

        const accounts = await ethereum.request({
          method: "eth_requestAccounts"
        });
        window.ethereum.on("accountsChanged", () => {
          window.location.reload();
        });
        setAccount(accounts[0]);

        const provider = new ethers.providers.Web3Provider(ethereum); // Reading the blockchain
        const signer = provider.getSigner(); // To change the state of the blockchain

        const contract = new ethers.Contract(
          contractAddress,
          contractABI,
          signer
        );

        setState({ provider, signer, contract });
      } catch (error) {
        alert(error.message);
      }
    };

    template();
  }, []);

  return (
    <div style={{ backgroundColor: "#EFEFEF", height: "100%" }}>
      <img src={chai} className='img-fluid' alt=".." width='100%' />
      <p className='text-muted lead' style={{ marginTop: "10px", marginLeft: "5px" }}>
        <small>Connected Account - {account}</small>
      </p>
      <div className='container'>
        <Buy state={state} />
        <Memos state={state}/>
        <GetBalance state={state}/>
      </div>
    </div>
  );
}

export default App;
