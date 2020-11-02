import React, { Component } from 'react';
import Web3 from 'web3';
import './App.css';
import ReactDOM from 'react-dom';
import Dapp from '../abis/Dapp.json'
import {OBJViewer, STLViewer} from 'react-stl-obj-viewer';
import axios from 'axios'
import Cookies from 'js-cookie'
import designVoting from '../abis/designVoting.json'
import { ethers } from "ethers";
import bs58 from 'bs58'
import CurrencyInput from 'react-currency-input';
const NodeStl = require("node-stl");
const keccak256 = require('keccak256')
const keccak2561 = require('js-sha3').keccak256;

//connessione al nodo di infura per ipfs
const ipfsClient = require('ipfs-http-client')
const ipfs = ipfsClient({ host: 'ipfs.infura.io', port: 5001, protocol: 'https' })
  let web3s = new Web3(new Web3.providers.WebsocketProvider('ws://localhost:7546'))
//tipi di formato .stl (più comune) 3MF AMF e .obj(open source)
// usa accept
// url example:'https://ipfs.infura.io/ipfs/QmZsdEtccredWWGZzZvU5fStsC7aWADJch588qAarGTky9'
//{`https://ipfs.infura.io/ipfs/${this.state.designHash}`}
//const user = []

class App extends Component {


//operazioni quando il componente viene chiamato
  async componentWillMount() {
    await this.loadWeb3()
  if(this.state.ethBrowser == true) {
    await this.loadBlockchainData()
      await this.subscriptionEvents()
      await this.cookiesLog()
      await this.setState({loading : false})
  }
  }
  async cookiesLog(){
    const isLogged = Cookies.get('log')
    const inMain = Cookies.get('main')
    const inAnn = Cookies.get('announce')
    const name = Cookies.get('name')
    const surname = Cookies.get('surname')
    const email = Cookies.get('email')
    const designer = Cookies.get('designer')
    const player = Cookies.get('player')
    const currentDesigns = Cookies.get('currentDesigns')
    if(isLogged) await this.setState({isLogged : isLogged})
    if(inMain) await this.setState({main : inMain})
    if(inAnn) await this.setState({announce : inAnn})
    if(name) await this.setState({name : name})
    if(surname) await this.setState({surname : surname})
    if(email) await this.setState({email : email})
    if(designer) await this.setState({designer : designer})
    if(player) await this.setState({player : player})
    if(currentDesigns) await this.setState({toCurrentDesigns : currentDesigns})
  }
  subscriptionEvents(){
    this.state.contract1.events.newDesignAvailable( function(error, event){ console.log(event); }).on('data', function(event){
     console.log(event); // same results as the optional callback above
 }).on('changed', function(event){
     // remove event from local database
 }).on('error', console.error);
 this.state.contract1.events.newPlayerAddition( function(error, event){ console.log(event); }).on('data', function(event){
  console.log(event); // same results as the optional callback above
}).on('changed', function(event){
  // remove event from local database
}).on('error', console.error);
  }
//carico la finestra (metamask) web3 o la converto in web3
  async loadWeb3() {
   if (window.ethereum) {
      window.web3 = new Web3(window.ethereum)
      await window.ethereum.enable()
      await this.setState({ethBrowser : true})
    }
    else if (window.web3) {
      window.web3 = new Web3(window.web3.currentProvider)
      await this.setState({ethBrowser : true})
    }
    else {
      console.log('Non-Ethereum browser detected. ')
      await this.setState({ethBrowser : false})
      await this.setState({loading : false})
      return
    }
  }
// dati della blockchain:
//account è l'indirizzo di colui che firma la transazione
//networkid è l'id della connessione es:localhost:7545
//contract è la variabile del contratto
//designHash è l'hash del file salvato sull'ipfs
  async loadBlockchainData() {
    const web3 = window.web3
    const accounts = await web3.eth.getAccounts()
    this.setState({ account: accounts[0] })
    console.log(accounts)
    const networkId = await web3.eth.net.getId()
    console.log(networkId)
    const networkData = designVoting.networks[networkId]
    console.log(networkData)
    if(networkData) {
      const contract = web3.eth.Contract(designVoting.abi, networkData.address)
      const contract1 = web3s.eth.Contract(designVoting.abi, networkData.address)
      this.setState({ contract : contract, contract1 : contract1 })
    } else {
      window.alert('Smart contract not deployed to detected network.')
    }
  }
  getBytes32FromIpfsHash(_ipfsListing) {
    return "0x"+bs58.decode(_ipfsListing).slice(2).toString('hex')
  }
  getIpfsHashFromBytes32(bytes32Hex) {
    const hashHex = "1220" + bytes32Hex.slice(2)
    const hashBytes = Buffer.from(hashHex, 'hex');
    const hashStr = bs58.encode(hashBytes)
    return hashStr
  }



  constructor(props) {
    super(props)

    this.state = {
      contract1: null,
      designHash: '',
      contract: null,
      web3: null,
      buffer: null,
      account: null,
      designName: '',
      desc:'',
      stlLink: null,
      objLink: null,
      designFormat : 'stl',
      username:'',
      password:'',
  //    wallet:'',
      privateKey:'',
      email:'',
      register : false,
      ethBrowser : false,
      invalidEmail : false,
      name : '',
      surname : '',
      isLogged : false,
      invalidLogin : false,
      disableStl : true,
      disableObj : true,
      announce : false,
      main : false,
      loading : true,
      file : null,
      amount : "0.00",
      expiry : "0",
      userType : 'designer',
      designer : false,
      player : false,
      avaibleDesign : [],
      currentDesigns : false
    }
  }





//login part
testMeta = (event) =>{
  event.preventDefault()
  const web3 = window.web3
  const try1 =  web3.eth.accounts.create();
 console.log(try1)
}
startApi =  (event) =>{
  event.preventDefault()
  axios.get('http://127.0.0.1:5000/api/get1').then(response => {
  console.log(response.data)
});
}
startApi2 = async (event) =>{
  event.preventDefault()
  console.log("sending data")
  const username = this.state.username
  const password = this.state.password
  const hpassword = keccak256(password).toString('hex')
  const wallet = this.state.account
  axios.post('http://127.0.0.1:5000/api/post1',{
    username : username,
    password : hpassword,
    wallet : wallet
  }).then(response => {
  if (response.data.length == 1) {
    const name = response.data[0][3]
    const surname = response.data[0][4]
    const email = response.data[0][6]
    const registrationType = response.data[0][7]
    if(registrationType == "designer") {
      this.setState({designer : true})
      console.log("logged as designer")
    }
    else if (registrationType == "player") {
      this.setState({player : true})
      console.log("logged as player")
    }
    else if (registrationType == "both") {
      this.setState({designer : true, player : true})
      console.log("logged as player and designer")
    }
    else {
      console.log("error")
      return
    }
    this.setState({isLogged : true ,name : name, surname : surname, email: email})
    this.setState({main : true})
    const designer = this.state.designer
    const player = this.state.player
    Cookies.set('name', name)
    Cookies.set('surname', surname)
    Cookies.set('email', email)
    Cookies.set('log', 'true')
    Cookies.set('main','true')
    Cookies.set('designer', designer)
    Cookies.set('player', player)
    console.log(response.data[0])
  }
  else {
    this.setState({invalidLogin : true})
    console.log("invalid login")
  }
});
}

captureFileL = async (event)=> {
  event.preventDefault()
  console.log("charging username")
  const stri = event.target.value
  await this.setState({ username: stri })
  console.log(this.state.username)
}
captureFileL1 = async (event)=> {
  event.preventDefault()
  console.log("charging password")
  const stri = event.target.value
  await this.setState({ password: stri })
  console.log(this.state.password)
}
captureFileL2 = async (event)=> {
  event.preventDefault()
  console.log("charging email")
  const stri = event.target.value
  var check = stri.includes("@")
  var check1 = stri.includes(".")
  if(check && check1) {
  await this.setState({invalidEmail : false})
  await this.setState({ email: stri })
  console.log(this.state.email)}
  else {
    await this.setState({invalidEmail : true })
    console.log("invalidEmail")
  }
}

captureFileL3 = async (event)=> {
  event.preventDefault()
  console.log("charging name")
  const stri = event.target.value
  await this.setState({ name: stri })
  console.log(this.state.name)
}
captureFileL4 = async (event)=> {
  event.preventDefault()
  console.log("charging surname")
  const stri = event.target.value
  await this.setState({ surname: stri })
  console.log(this.state.surname)
}
setRegister = async (event) => {
  event.preventDefault()
  console.log("register init")
  await this.setState({register : true})
}
Return = async (event) => {
  event.preventDefault()
  console.log("register aborted")
  await this.setState({register : false})
}
sendData =  (event) => {
  event.preventDefault()
  const valid = this.state.invalidEmail
  if (valid) return
  console.log("sending data")
  const username = this.state.username
  const password = this.state.password
  const hpassword = keccak256(password).toString('hex')
  const wallet = this.state.account
  const email = this.state.email
  const name = this.state.name
  const surname = this.state.surname
  const registrationType = this.state.registrationType
  console.log(wallet)
  axios.post('http://127.0.0.1:5000/api/post2',{
    username : username,
    password : hpassword,
    wallet : wallet,
    email : email,
    name : name,
    surname : surname,
    registrationType : registrationType
  }).then(async (response) => {
  console.log(response.data)
  await this.setState({register : false})
  //
  //controllare response.error;
  //
  if (registrationType == "player") {
    console.log("adding player phase")
    const web3 = window.web3
    function toHex(str) {
     var hex = ''
     for(var i=0;i<str.length;i++) {
      hex += ''+str.charCodeAt(i).toString(16)
     }
     return hex
    }
  //  var accounts = await web3.eth.getAccounts()

    const account = this.state.account
    console.log(account)
    var hash = "0xabaf00e099568043da6b68d64d5f9115d59fa5439384c15dc509b6ab7233b15d"//keccak256(account).toString('hex')
    console.log(hash)
    //var hhash = keccak2561(account);
  //  var fhash = '0x'+hash
  //  var hash = web3.utils.sha3(account)

     await web3.eth.personal.sign(hash, account ,(err,res) =>{
      if(res){
      console.log("try", res)
      web3.eth.personal.ecRecover(hash, res).then(console.log)}
  //  this.state.contract.methods.addPlayer(hash, res).send({from : account})}

      if(err){console.log("err")}
    })
  //  console.log(signature)

  //  this.state.contract.methods.addPlayer(hash, signature).send({from : account})
  }
  else if (registrationType == "both") {
    console.log("adding player phase (from both)")
    const web3 = window.web3
    var accounts = await web3.eth.getAccounts()
    var hash = web3.utils.sha3(accounts)
    var signature = await web3.eth.personal.sign(hash, accounts[0], '')
  }
  else {
    console.log("error")
    return
  }
});
}
logoutU = async (event) => {
  event.preventDefault()
  console.log("logout")
  Cookies.remove('log')
  Cookies.remove('announce')
  Cookies.remove('name')
  Cookies.remove('surname')
  Cookies.remove('email')
  Cookies.remove('designer')
  Cookies.remove('player')
  await this.setState({isLogged : false})
  await this.setState({announce : false})
  console.log(this.state.isLogged)
}
registrationType = async (event) => {
  event.preventDefault()
  console.log("type registration selected")
  const registrationType =  event.target.value
  console.log(this.state.registrationType)
  console.log(event.target.value)
  await  this.setState({registrationType : registrationType })
  console.log(this.state.registrationType)
}
//end login part


//main part
toUpload = async (event) =>{
  event.preventDefault()
  console.log("to Upload a design")
  await this.setState({announce : true})
  await this.setState({main : false})
  Cookies.set('announce','true')
  Cookies.remove('main')
}
logoutM = async (event) => {
  event.preventDefault()
  console.log("logout")
  Cookies.remove('log')
  Cookies.remove('main')
  Cookies.remove('name')
  Cookies.remove('surname')
  Cookies.remove('email')
  Cookies.remove('designer')
  Cookies.remove('player')
  await this.setState({isLogged : false})
  await this.setState({main : false})
  console.log(this.state.isLogged)
}
toCurrentDesigns = async (event) =>{
  event.preventDefault()
  console.log("to current designs")
  this.state.contract1.getPastEvents('newDesignAvailable', {
      fromBlock: 0,
      toBlock: 'latest'
    }, (error, result) =>{
      if (!error) {
        let result1 = result.map(a => a.returnValues);
        console.log(result1)
        for(var i in result1){
          console.log("decoding")
          var tmp = this.getIpfsHashFromBytes32(result1[i].fileHash)
          tmp = "https://ipfs.infura.io/ipfs/"+tmp
          console.log(tmp)
          result1[i].fileHash=tmp
        }
       this.setState({avaibleDesign : result1})
      } else {
        console.log(error);
      }
    });
  await this.setState({currentDesigns : true})
  await this.setState({main : false})
  Cookies.set('currentDesigns','true')
  Cookies.remove('main')
}
//end main part




//current Designs part

toMainC = async (event) => {
  event.preventDefault()
  console.log("to Main")
  Cookies.remove('currentDesigns')
  await this.setState({currentDesigns : false})
  await this.setState({main : true})
  Cookies.set('main','true')
}
//end current designs part







//announce part
setCommit = (event, maskedvalue, floatvalue) => {
       this.setState({amount: floatvalue});
       console.log(floatvalue)
   }
  formatSelect = async (event) => {
    event.preventDefault()
    console.log("format selected")
    const designFormat =  event.target.value
    console.log(this.state.designFormat)
    console.log(event.target.value)
    await  this.setState({designFormat : designFormat })
    console.log(this.state.designFormat)
  }


  captureFile = (event) => {
    event.preventDefault()
    const file = event.target.files[0]
    //var stl = new NodeStl( file, {density: 1.04});
  //  console.log(stl.volume);
   const format = this.state.designFormat
   if(format == "stl"){
     this.setState({ stlFile: file })
     this.setState({disableObj : false})
     this.setState({disableStl : true})
     console.log(this.state.stlFile)
   }
   else {
     if(format == 'obj'){
      this.setState({objFile : file})
      this.setState({disableStl: false})
      this.setState({disableObj : true})
      console.log(this.state.objFile)
     }
     else {
       console.log("format not selected")
     }
   }
    const reader = new window.FileReader()
    reader.readAsArrayBuffer(file)
    reader.onloadend = () => {
      this.setState({ buffer: Buffer(reader.result) })
      console.log('buffer', this.state.buffer)
    }
  }
 captureFile2 = async (event) => {
 event.preventDefault()
 console.log("charging designName")
 const stri = event.target.value
 await this.setState({ designName: stri })
 console.log(this.state.designName)
 }
 captureFile5 = async (event) => {
 event.preventDefault()
 console.log("charging design description")
 const stri = event.target.value
 await this.setState({ desc: stri})
 console.log(this.state.desc)
 }
  onSubmit = async (event) => {
    event.preventDefault()

    await ipfs.add(this.state.buffer, async (error, result)  => {
      console.log('Ipfs result', result)
      if(error) {
        console.error(error)
        return
      }
      console.log(result)
      this.setState({ designHash: result[0].hash })
     console.log("Submitting data to ipfs")
      const designName = this.state.designName;
      const desc = this.state.desc;
      const makerName = this.state.name;
      const makerSurname = this.state.surname;
      const designHash = this.state.designHash;
      if (designName == '' || makerName == '' || makerSurname == '' || desc == ''){
        console.log("metadata not saved")
        this.setState({designName:'',makerName:'',makerSurname:'',desc:''})
        return
      }
     else{
       if(designHash == ''){
         console.log("design not uploaded")
       }
       else{
           const toJSON = {
               designName : designName,
               makerName : makerName,
               makerSurname : makerSurname,
               desc : desc,
               designHash : designHash
               };
       const myJson = JSON.stringify(toJSON) ;
       console.log(toJSON)
       console.log(myJson)
       var buf = Buffer.from(myJson);
       ipfs.add(buf, (error, result) => {
         console.log('Ipfs result', result)
         if(error) {
           console.error(error)
           return
         }
          console.log(result[0].hash)
       })
       this.setState({designName:'',makerName:'',makerSurname:'',desc:''})
       }
       }
       this.state.contract.methods.getExpiry().call({from: this.state.account}).then((res) => {var hash = this.state.designHash
       console.log("inizio conv")
    const fhash = this.getBytes32FromIpfsHash(hash)
    const web3 = window.web3
      console.log("solo fixedhash",fhash)
      console.log(this.state.contract)
           console.log(res)
    var currentTimeInSeconds=Math.floor(Date.now()/1000);
           console.log(currentTimeInSeconds)
     const amount1 = this.state.amount
     console.log(amount1)
     const amount = web3.utils.toWei(amount1.toString(), 'ether');
          console.log(amount)
     const manager = "0xeFC24d39428360E526D467d219Ce85F0d9B71b8e"
    console.log('start smart contract call')
    this.state.contract.methods.announce(fhash, currentTimeInSeconds, res, amount, manager).send({from : this.state.account, value : amount }).on('transactionHash', function(hash){ console.log("Hash: " + hash);
}).on('error', console.error).on('confirmation', function(confirmationNumber, receipt){
    console.log(receipt)
}).on('receipt', function(receipt){
  console.log("provareceipt")
})})
    })
  }
  toMainU = async (event) => {
    event.preventDefault()
    console.log("to Main")
    Cookies.remove('announce')
    await this.setState({announce : false})
    await this.setState({main : true})
    Cookies.set('main','true')
    console.log(this.state.announce)
  }
  // end announce part
  render() {
    return (
      <div>
        <nav className="navbar navbar-dark fixed-top bg-dark flex-md-nowrap p-0 shadow">
          <a
            className="navbar-brand col-sm-3 col-md-2 mr-0"
            target="_blank"
            rel="noopener noreferrer"
          >
            App di prova
          </a>
        </nav>
        <div className="container-fluid mt-5">
          <div className="row">
            <main role="main" className="col-lg-12 d-flex text-center">
              <div className="content mr-auto ml-auto">
                <a
                  target="_blank"
                  rel="noopener noreferrer"
                >
                </a>

                {/* loading part*/}
                {(this.state.loading) && (<h1>Loading</h1>)}
                {/*end loading part*/}

                {/*login section*/}
                <div >
                {(!this.state.isLogged && !this.state.loading) && (<h1 id="param1">Login/Register Page</h1>)}
                {/* user logged with metamask */}
                <form>
                {(this.state.ethBrowser && !this.state.isLogged && !this.state.loading) && (  <label id="param2" >
                username:
                <input type="text"  onChange={this.captureFileL} />
                </label>)}
                </form>
                {(this.state.ethBrowser && !this.state.isLogged && !this.state.loading) && (<form>
                 <label id="param3">
                password:
                <input type="password"  onChange={this.captureFileL1} />
                </label>
                </form>)}
                {(this.state.invalidLogin && !this.state.isLogged && this.state.ethBrowser && !this.state.loading) && (<div id="param6">invalid username/password</div>)
                }
                { (this.state.register && this.state.ethBrowser && !this.state.isLogged && !this.state.loading) ?
                <form>
                <label id="param7">
                name:
                <input type="text"  onChange={this.captureFileL3} />
                </label>
                 </form>  : null
                }
                { (this.state.register && this.state.ethBrowser && !this.state.isLogged && !this.state.loading) ?
                <form>
                <label id="param8">
                surname:
                <input type="text"  onChange={this.captureFileL4} />
                </label>
                </form>  : null
                }
                { (this.state.register && this.state.ethBrowser && !this.state.isLogged && !this.state.loading) ?
                <form>
                <label id="param9">
                email:
                <input type="text"  onChange={this.captureFileL2} />
                </label>
                 </form>  : null
                }
                {(this.state.register && this.state.ethBrowser && this.state.invalidEmail && !this.state.isLogged && !this.state.loading) && (
                 <div id="param10">invalid email</div>)
                 }

                { (!this.state.register && this.state.ethBrowser && !this.state.isLogged && !this.state.loading) && (
                <button class="button" id="param4" onClick={this.startApi2}>Login</button>)
                }

                { (!this.state.register && this.state.ethBrowser  && !this.state.isLogged && !this.state.loading)  && (
                  <button class="button" id="param5" onClick={this.setRegister}>Register</button>)
                }

                {(this.state.register && this.state.ethBrowser  && !this.state.isLogged && !this.state.loading) && (<form >
                <label>
               Registration Type:
               <select onChange = {this.registrationType}>
               <option value="designer">designer</option>
               <option value="player">player</option>
               <option value="both">both</option>
              </select>
              </label>
              </form>)}

                { (this.state.register && this.state.ethBrowser && !this.state.isLogged && !this.state.loading) && (
                  <button class="button" id="param11" onClick={this.sendData}>SendData</button>)
                }

                { (this.state.register && this.state.ethBrowser && !this.state.isLogged && !this.state.loading) && (
                  <button class="button" id="param12" onClick={this.Return}>Return</button>)
                }

                {/* end user logged with metamask*/}
                {/*user without metamask*/}
                {(!this.state.ethBrowser && !this.state.isLogged && !this.state.loading && !this.state.loading) && (<div id="param13">Non-Ethereum browser detected, please install metamask.<br />
                [.....metamask tutorial <a id="para" href={'https://metamask.io/download.html'}>here</a>...]
                </div>)}
                {/*user without metamask*/}
                </div>
                {/*end login section*/}







                {/*main section*/}
                { (this.state.ethBrowser && this.state.isLogged && this.state.main && !this.state.loading) && (
                <p>User data<br />name:{this.state.name}<br />surname:{this.state.surname}<br />email:{this.state.email}<br />wallet:{this.state.account}</p>)
                }
                { (this.state.ethBrowser && this.state.isLogged && this.state.main && !this.state.loading && this.state.designer) && (
                <button class="button"  onClick={this.toUpload}>Upload a design</button>)
                }
                { ( this.state.ethBrowser && this.state.isLogged && this.state.main && !this.state.loading) && (
                  <button class="button" onClick={this.logoutU}>Logout</button>)
                }
                { (this.state.ethBrowser && this.state.isLogged && this.state.main && !this.state.loading ) && (
                <button class="button" onClick={this.toCurrentDesigns} >List avaible design to vote</button>)
                }
                {/*end main section*/}




                {/*see avaible design*/}
                { (true) &&
                  (<ul>
                    <table><tr><th>designNo</th><th>creatorAddress</th><th>design</th></tr>{this.state.avaibleDesign.map((item)=><tr><td>{item.designNo.toString()}</td><td>{item.creator.toString()}</td><td>{item.fileHash.toString()}</td></tr>)}</table>
                </ul>)}
                { (true) && (
                  <button  onClick={this.toMainC}>Return</button>)
                }
                {/*see avaible design*/}




                {/*announce section*/}
                {(this.state.ethBrowser && this.state.isLogged && this.state.announce && !this.state.loading && this.state.designer) && (<div>Design caricato:</div>)}
                {(this.state.ethBrowser && this.state.isLogged && this.state.disableStl && this.state.announce && !this.state.loading && this.state.stlFile && this.state.designer) ?
                       <STLViewer
                           onSceneRendered={(element) => {
                               console.log(element)
                           }}
                           sceneClassName="test-scene"
                           file={this.state.stlFile}
                           className="obj"
                           modelColor="#FF0000"/> : null

                   }
               {(this.state.ethBrowser && this.state.isLogged && this.state.disableObj && this.state.announce && !this.state.loading && this.state.objFile && this.state.designer) ?
                        <OBJViewer
                            onSceneRendered={(element) => {
                                console.log(element)
                            }}
                            sceneClassName="test-scene"
                            file={this.state.objFile}
                            className="obj"
                            modelColor="#FF0000"/> : null
                    }

                <p>&nbsp;</p>
                {(this.state.ethBrowser && this.state.isLogged && this.state.announce && !this.state.loading && this.state.designer) && (<h2>Change design</h2>)}
                {(this.state.ethBrowser && this.state.isLogged && this.state.announce && !this.state.loading && this.state.designer) && (<form>
                  <input type='file'  onChange={this.captureFile} />
                <p>&nbsp;</p>
                </form>)}
                {(this.state.ethBrowser && this.state.isLogged && this.state.announce && !this.state.loading && this.state.designer) && (<form >
                <p>&nbsp;</p>
                <label>
                Design title:
                <input type="text" onChange={this.captureFile2} />
                </label>
                </form>)}
                {(this.state.ethBrowser && this.state.isLogged && this.state.announce && !this.state.loading && this.state.designer) && (<form onSubmit={this.captureFile2}>
               <label>
                Design description:
                <textarea onChange={this.captureFile5} />
               </label>
               </form>)}
               { (this.state.ethBrowser && this.state.isLogged && this.state.announce && !this.state.loading && this.state.designer) &&(<form>
                             amount:
                               <CurrencyInput value={this.state.amount} onChangeEvent={this.setCommit}
                               CurrencyInput suffix=" ETH" />
                          </form>) }
              {(this.state.ethBrowser && this.state.isLogged && this.state.announce && !this.state.loading && this.state.designer) && (<button class="button" onClick={this.onSubmit}>Submit</button>)}
              {(this.state.ethBrowser && this.state.isLogged && this.state.announce && !this.state.loading && this.state.designer) && (<form >
              <label>
             Select design format:
             <select onChange = {this.formatSelect}>
             <option value="stl">.stl</option>
             <option value="obj">.obj</option>
          </select>
        </label>
      </form>)}
      { (this.state.ethBrowser && this.state.isLogged && this.state.announce && !this.state.loading && this.state.designer) && (
        <button class="button" onClick={this.logoutU}>Logout</button>)
      }
      { (this.state.ethBrowser && this.state.isLogged && this.state.announce && !this.state.loading && this.state.designer) && (
        <button class="button" onClick={this.toMainU}>Return</button>)
      }
      {/*end announce section*/}
              </div>
            </main>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
