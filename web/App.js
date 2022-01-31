import React, { useEffect,useState,Component } from 'react';
//import Header from './shared/components/Header';
import './App.css'
import "core-js/stable";
import "regenerator-runtime/runtime";
import Web3 from 'web3';
import nav from 'react-bootstrap/Nav';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Navbar from './components/Navbar';
import Nav from 'react-bootstrap/Nav';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
//IMPORT CONTRACTS
import designVoting from './blockchain/src/abis/designVoting.json'
//IMPORT PAGES
import Home from './components/Home'
import PlayerDetails from './components/PlayerDetails';
import Layout from './components/Layout'
import AddPrinter from './components/AddPrinter';
import Signin from './components/Signin';
import Signup from './components/Signup';
import UploadDesign from './components/UploadDesign';
import CalculateRes from './components/CalculateRes';
import ListDesign from './components/ListDesign';
import VoteDesign from './components/VoteDesign';
function App(){


useEffect(() => {
    loadWeb3();
    loadBlockchaindata();
},[])

const [currentaccount,setCurrentaccount] = useState("");
const[loader,setloader]= useState(true);
const[design,Setdesign] = useState();

const loadWeb3 = async() => {
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
//INTERACT WITH BLOCKCHAIN
const loadBlockchaindata = async ()=>{
    setloader(true); //così fino a quando non verifico che il wallet metamask è ok resto in loading
    const web3 = window.web3;
    const accounts = await web3.eth.getAccounts();
    const account = accounts[0];
    setCurrentaccount(account);
    const networkId = await web3.eth.net.getId();

    const networkData = designVoting.networks[networkId]; //se non è presente il contract non è deployato

    if(networkData){
        const design = new web3.eth.Contract(designVoting.abi,networkData.address);// dal file migration.json
        /*interaction test
        const players1 = await design.methods.players(1).call();
        const player2 = await design.methods.players(1).call();
        console.log(players1);
        console.log(players2);
        Setdesign(design);
        */
        setloader(false); // se tutto è andato a buon fine con il wallet metamask appo vado avanti
    }else{
        window.alert('the smart contract is not deployed')
    }
    return (account);
}

if(loader){
    return <div>loading...</div>
}

//PAGES
const goHome = async ()=>{
return(
<Home />
)

}

return(
<div>
          <BrowserRouter>
              <Routes>
                  <Route path="/" element ={<Layout account={currentaccount}/>}>
                  <Route index element={<Home />}/>
                  <Route path="PlayerDetails" element={<PlayerDetails />}/>
                  <Route path="AddPrinter" element={<AddPrinter />}/>
                  <Route path="Signin" element={<Signin />}/>
                  <Route path="Signup" element={<Signup account={currentaccount}/>}/>
                  <Route path ="UploadDesign" element={<UploadDesign />}/>
                  <Route path="CalculateRes" element={<CalculateRes />}/>
                  <Route path="ListDesign" element={<listDesign />}/>
                  <Route path="VoteDesign" element={<VoteDesign />}/>
                  </Route>
              </Routes>
          </BrowserRouter>

</div>
    );

}
export default App;