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
//IMPORT NAVBAR
import Layout from './components/Layout'
//IMPORT AUTH COMPONENT
import Signin from './components/Signin';
import Signup from './components/Signup';
//IMPORT PRINTER PAGES
import AddPrinter from './pages/printers/AddPrinter';
import MyPrinters from './pages/printers/MyPrinters';
// IMPORT DESIGN PAGES
import Announce from './pages/Design/Announce';
import MyDesign from './pages/Design/MyDesign';
import MyVotes from './pages/Design/MyVotes';
import VoteDesign from './pages/Design/VoteDesign';
//IMPORT ORDERS PAGES
import NewOrder from './pages/Orders/NewOrder';
import MyOrder from './pages/Orders/MyOrder';

import BuyToken from './pages/BuyToken';

//IMPORT MAPS FOR TESTS DELETE AFTER COMPLETE
import Maps from './components/Maps';


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


return(
    <div>
<div>
          <BrowserRouter>
              <Routes>
                  <Route path="/" element ={<Layout account={currentaccount}/>}>
                  <Route index element={<Home />}/>
                  <Route path="AddPrinter" element={<AddPrinter />}/>
                  <Route path="Signin" element={<Signin />}/>
                  <Route path="Signup" element={<Signup account={currentaccount}/>}/>
                  <Route path="VoteDesign" element={<VoteDesign />}/>
                  <Route path="MyPrinters" element={<MyPrinters />}/>
                  <Route path="MyOrder" element={<MyOrder />}/>
                  <Route path="Announce" element={<Announce />}/>
                  <Route path="MyVotes" element={<MyVotes />}/>
                  <Route path="AddPrinter" element={<AddPrinter />}/>
                  <Route path="BuyToken" element={<BuyToken />}/>
                  <Route path="MyDesign" element={<MyDesign />}/>
                  <Route path="NewOrder" element={<NewOrder />}/>
                  <Route path="Maps" element={<Maps />}/>
                  </Route>
              </Routes>
          </BrowserRouter>

</div>
</div>
    );

}
export default App;