import React, { useState, useEffect } from 'react';
import Web3 from 'web3';
import Cypher from './contracts/Cypher.json';
import './App.css';

import Navbar from './components/Navbar/Navbar';

function App() {
  const [account, setAccount] = useState([]);
  const [contract, setContract] = useState();

  useEffect(() => {
    const loadWeb3 = async () => {
      if(window.ethereum) {
        window.web3 = new Web3(window.ethereum);
        await window.ethereum.enable();
      } else if (window.web3) {
        window.web3 = new Web3(window.web3.currentProvider)
      } else {
        window.alert('Non-Ethereum browser detected. You should consider trying Metamask!')
      }  
    }

    const loadBlockchainData = async () => {
      const web3 = window.web3; 
      const accounts = await web3.eth.getAccounts();
      setAccount(accounts[0]);
      if(account) {
        const networkId = await web3.eth.net.getId();
        const deployedNetwork = Cypher.networks[networkId];
        if(deployedNetwork) {
          const contract = new web3.eth.Contract(
            Cypher.abi,
            deployedNetwork && deployedNetwork.address,
          );
          setContract(contract);
        } else {
          window.alert('Contract not deployed or not detected network...');
        }
      }
    }
    loadWeb3();
    loadBlockchainData();

    window.ethereum.on('accountsChanged', accounts => {
      setAccount(accounts[0]);
    });
    
  }, [account])

  return (
    <div className="App">
      <Navbar />
    </div>
  );
}

export default App;
