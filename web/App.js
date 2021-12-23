import React, { Component } from 'react';
import Header from './shared/components/Header';
import './App.css'
import "core-js/stable";
import "regenerator-runtime/runtime";
import Web3 from 'web3';
import nav from 'react-bootstrap/Nav';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Navbar from 'react-bootstrap/Navbar';
class App extends Component{

async componentWillMount(){
await this.loadBlockchainData()
await this.loadWeb3 // check metamask connection
}

async loadWeb3(){
    if(window.ethereum){
        window.web3=new Web3(window.ethereum)
        await window.ethereum.enable()
    }
    else if(window.web3){
    window.web3=new Web3(window.web3.currentProvider)
    }
    else{
    window.alert('Scarica Metamask')
    }
}

async loadBlockchainData(){
    const web3 = new Web3(Web3.givenProvider || "http://localhost:8545")
    const network = await web3.eth.net.getNetworkType()
    const accounts = await web3.eth.getAccounts()
    this.setState({ account: accounts[0]})
    console.log("account",accounts[0])
    console.log("network:",network)
}

constructor(props){
super(props)
this.state = { account: ''}
}

render(){
return(
<>
<div>
    <Navbar bg="pri" expand ="lg" fixed="top" variant="light">
    <Navbar.Brand>Dapp</Navbar.Brand>
    </Navbar>
</div>
    <div className="container">
      <h2>
        Dapp
      </h2>
      <p> Your account : {this.state.account}</p>
    </div>
    </>
)
};
}

export default App;