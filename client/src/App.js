import React, { useState, useEffect } from 'react';
import Web3 from 'web3';
import Cypher from './contracts/Cypher.json';
import './App.css';
import Particles from 'react-particles-js';

import Navbar from './components/Navbar/Navbar';
import Form from './components/Form/Form';
import Card from './components/Card/Card';

const particlesOptions = {
  particles: {
    number: {
      value: 80,
      density: {
        enable: true,
        value_area: 900
      }
    },
    opacity: {
      value: 0.5,
    },
  }
};

function App() {
  const [account, setAccount] = useState([]);
  const [contract, setContract] = useState();
  const [admin, setAdmin] = useState(undefined);
  const [tokensImgs, setTokensImgs] = useState([]);

  useEffect(() => {
    const loadWeb3 = async () => {
      if (window.ethereum) {
        window.web3 = new Web3(window.ethereum);
        await window.ethereum.enable();
      } else if (window.web3) {
        window.web3 = new Web3(window.web3.currentProvider)
      } else {
        window.alert('Non-Ethereum browser detected. You should consider trying Metamask!')
      }
    };

    const loadBlockchainData = async () => {
      const web3 = window.web3;
      const accounts = await web3.eth.getAccounts();
      setAccount(accounts[0]);
      if (account) {
        const networkId = await web3.eth.net.getId();
        const deployedNetwork = Cypher.networks[networkId];
        if (deployedNetwork) {
          const contract = new web3.eth.Contract(
            Cypher.abi,
            deployedNetwork && deployedNetwork.address,
          );
          setContract(contract);
          const admin = await contract.methods.admin().call();
          setAdmin(admin);

          let nftBalance = await contract.methods.balanceOf(accounts[0]).call();
          let urisArray = [];
          for (let i = 0; i < nftBalance; i++) {
            let tokenId = await contract.methods.tokenOfOwnerByIndex(accounts[0], i).call();
            let tokenUri = await contract.methods.tokenURI(tokenId).call();
            urisArray.push(tokenUri);
          };
          setTokensImgs([...urisArray]);
        } else {
          window.alert('Contract not deployed or not detected network...');
        }
      }
    };

    loadWeb3();
    loadBlockchainData();

    window.ethereum.on('accountsChanged', accounts => {
      setAccount(accounts[0]);
    });

  }, [account]);

  const isReady = () => {
    return (
      typeof contract !== 'undefined'
      && typeof account !== 'undefined'
    );
  }

  if (!isReady()) {
    return <div>Loading Web3, accounts, and contract...</div>;
  }

  return (
    <div>
      <Navbar />
      <Particles className='particles' params={particlesOptions} />
      <div className='container'>
        {
          account === admin && (
            <Form contract={contract} account={account} />
          )
        }
        {
          tokensImgs.length > 0 && (
            <Card tokenUri={tokensImgs} />
          )
        }
      </div>

    </div>
  );
}

export default App;
