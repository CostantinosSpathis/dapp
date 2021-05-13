import React, { Component } from 'react';
import Button from 'react-bootstrap/Button';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Form from 'react-bootstrap/Form';
import FormControl from 'react-bootstrap/FormControl';
import 'bootstrap/dist/css/bootstrap.min.css';
import Web3 from 'web3';
import './App.css';
import {OBJViewer, STLViewer} from 'react-stl-obj-viewer';
import axios from 'axios'
import Cookies from 'js-cookie'
import Select from 'react-select';
import designVoting from '../abis/designVoting.json'
import bs58 from 'bs58'
import CurrencyInput from 'react-currency-input';
import { keccak256 } from 'js-sha3';
import NumericInput from 'react-numeric-input';
import Table from 'react-bootstrap/Table'
import Card from 'react-bootstrap/Card'
import logo from './ethereum-eth-logo.png';

//connessione al nodo di infura per ipfs
const ipfsClient = require('ipfs-http-client')
const ipfs = ipfsClient({ host: 'ipfs.infura.io', port: 5001, protocol: 'https' })
  let web3s = new Web3(new Web3.providers.WebsocketProvider('ws://localhost:7546'))
//tipi di formato .stl (più comune) 3MF AMF e .obj(open source)
// usa accept
// url example:'https://ipfs.infura.io/ipfs/QmZsdEtccredWWGZzZvU5fStsC7aWADJch588qAarGTky9'
//{`https://ipfs.infura.io/ipfs/${this.state.designHash}`}
//const user = []
const options = [
  { value: 'designer', label: 'designer' },
  { value: 'player', label: 'player' },
  { value: 'both', label: 'both' }
];
const options1 = [
  { value: '1', label: 'valid' },
  { value: '-1', label: 'invalid' }
];
const options2 = [
  { value: '3', label: 'very high' },
  { value: '2', label: 'high' },
  { value: '1', label: 'medium' },
  { value: '0', label: 'low' }
];
const options3 = [
  { value: 'true', label: 'yes' },
  { value: 'false', label: 'no' }
];
const options4 = [
  { value: 'stl', label: '.stl' },
  { value: 'obj', label: '.obj' }
];
class App extends Component {


//operazioni quando il componente viene chiamato
  async componentWillMount() {
    await this.loadWeb3()
  if(this.state.ethBrowser == true) {
    await this.loadBlockchainData()
    if(this.state.contract1)  {await this.subscriptionEvents()
      await this.cookiesLog()
      await this.setState({loading : false})}
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
    var playerDet = Cookies.get('playerDet')
    const playerDetails = Cookies.get('playerDetails')
    var designIndex = Cookies.get('designIndex')
    const manager = Cookies.get('manager')
    const currentDesignsM = Cookies.get('currentDesignsM')
    const designSelectedM = Cookies.get('designSelectedM')
    const designSel = Cookies.get('designSel')
    const registeredDesigns = Cookies.get('registeredDesigns')
    const designVotingIndex = Cookies.get('designVotingIndex')
    const calculateResult = Cookies.get('calculateResult')
    const calculateResultIndex = Cookies.get('calculateResultIndex')
    var votingVariables = Cookies.get('votingVariables')
    const designSelCommit = Cookies.get('designSelCommit')
    const addPrinter = Cookies.get('addPrinter')
    if (addPrinter) await this.setState({addPrinter:addPrinter})
    if(calculateResult) await this.setState({calculateResult: calculateResult})
    if (registeredDesigns)  await this.setState({registeredDesigns : registeredDesigns})
    if(designSelectedM) await this.setState({designSelectedM: designSelectedM})
    if(currentDesignsM) await this.setState({currentDesignsM: currentDesignsM})
    if (manager) await this.setState({manager: manager})
    if(isLogged) await this.setState({isLogged : isLogged})
    if(inMain) await this.setState({main : inMain})
    if(inAnn) await this.setState({announce : inAnn})
    if(name) await this.setState({name : name})
    if(surname) await this.setState({surname : surname})
    if(email) await this.setState({email : email})
    if(designer == "false") await this.setState({designer : false})
    if(designer == "true") await this.setState({designer : true})
    if(player == "false") await this.setState({player : false})
    if(player == "true") await this.setState({player : true})
    if(currentDesigns) await this.setState({currentDesigns : currentDesigns})
    if(votingVariables){
      console.log("testing")
      console.log("designSelCommit", designSelCommit)
      votingVariables = JSON.parse(votingVariables)
      console.log("votingVariables", votingVariables)
      console.log("account", this.state.account)
      const index = votingVariables.length
      console.log("index",index)
      for (i=0; i<index; i++){
        if (designSelCommit == votingVariables[i].designNo && this.state.account == votingVariables[i].account){
          await this.setState({nounce : votingVariables[i].nounce})
          await this.setState({designSelCommit: designSelCommit})
          console.log("nounce",this.state.nounce)
          await this.setState({voteSelected : votingVariables[i].vote})
          console.log("vote",this.state.voteSelected)
          await this.setState({commited: true})
          await this.setState({designVoted: true})
        }
      }
    }
    if(designVotingIndex){
      let result1=[]
      let result2="true"
      const account = this.state.account
      var k=0;
     for(var i=0; i<designVotingIndex; i++){
       await this.state.contract.methods.getRegPlayerAddresses(i).call({from: this.state.account}).then( async(re) =>{
         const addresses = re
         console.log("addresses", addresses)
         const isRegistered = addresses.includes(account)
         console.log("is registered:",isRegistered)
         if (isRegistered == true){
           await this.state.contract.methods.getDesigne(i).call({from: this.state.account}).then((r) =>{
             result1.push(r)
             console.log("result",k,result1)
             result2="true"
           })
         }
         else{
           console.log("not registered",i)
           result2="false"
           k=k-1
         }
       })
      console.log("decoding")
      console.log("result",result1[k])
      if(result2=="true"){
        var currentTimeInSeconds=Math.floor(Date.now()/1000);
        console.log("now timestamp",currentTimeInSeconds)
        var timestamp = result1[k].timestamp.toString()
        console.log("date uploading", timestamp)
        var expiry = result1[k].deltaExp.toString()
        console.log("expiry",expiry)
        var expired = +timestamp + +expiry
        console.log("expired time",expired)
        var expired = +expired - +currentTimeInSeconds
        if(expired <= 0)result1[k]["expired"] = "expired"
        if (expired > 0)result1[k]["expired"] = "avaible"
        console.log("avaibility",result1[k].expired)
      var tmp = this.getIpfsHashFromBytes32(result1[k].filehash)
      tmp = "https://ipfs.infura.io/ipfs/"+tmp
      console.log(tmp)
      result1[k].filehash=tmp
      result1[k]["designNo"] = i
      console.log(result1)
      this.setState({avaibleDesign : result1})}
      k=k+1
    }
    }
    if(playerDet){
              playerDet = JSON.parse(playerDet)
             await this.setState({playerDet : playerDet})
                }
    if(designIndex){
      console.log(designIndex)
      let result1=[]
      for(var i=0; i<designIndex; i++){
      await this.state.contract.methods.getDesigne(i).call({from: this.state.account}).then((r) =>{
        result1.push(r)
      })
      var currentTimeInSeconds=Math.floor(Date.now()/1000);
      console.log("now timestamp",currentTimeInSeconds)
      var timestamp = result1[i].timestamp.toString()
      console.log("date uploading", timestamp)
      var expiry = result1[i].deltaExp.toString()
      console.log("expiry",expiry)
      var expired = +timestamp + +expiry
      console.log("expired time",expired)
      var expired = +expired - +currentTimeInSeconds
      if(expired <= 0)result1[i]["expired"] = "expired"
      if (expired > 0)result1[i]["expired"] = "avaible"
      console.log("avaibility",result1[i].expired)
      console.log("decoding")
    if(result1[i] !='undefinied'){  var tmp = this.getIpfsHashFromBytes32(result1[i].filehash)
      tmp = "https://ipfs.infura.io/ipfs/"+tmp
      console.log(tmp)
      result1[i].filehash=tmp
      result1[i]["designNo"] = i
      console.log(result1)
      this.setState({avaibleDesign : result1})}
    }
            }
    if(playerDetails) await this.setState({playerDetails : playerDetails})
    if(designSel){
      this.setState({designSel : designSel})
      this.state.contract.methods.getRegPlayerAddresses(designSel).call({from: this.state.account}).then((r) =>{
       const result1=r
       console.log(result1)
       this.setState({playerList : result1})
     })
    }
    if(calculateResultIndex){
        let result1=[]
        var result2="true"
        var k=0
       for(var i=0; i<calculateResultIndex; i++){
        await this.state.contract.methods.getDesigne(i).call({from: this.state.account}).then((r) =>{
          if (r.vendor == this.state.account) {
            result1.push(r)
            result2="true"
          }
          else{
            result2="false"
            k=k-1
          }
        })
        console.log("decoding")
        if(result2=="true"){  var tmp = this.getIpfsHashFromBytes32(result1[k].filehash)
        tmp = "https://ipfs.infura.io/ipfs/"+tmp
        console.log(tmp)
        result1[k].filehash=tmp
        result1[k]["designNo"] = i
        console.log(result1)
        this.setState({avaibleDesign : result1})}
        k=k+1
      }

    }
  }



  subscriptionEvents(){
    const delay = (ms) => new Promise(res => setTimeout(res, ms));
    this.state.contract1.events.newDesignAvailable( function(error, event){ /*console.log(event);*/ }).on('data', async (event) =>{
     console.log("new design avaible",event);
     const creator = event.returnValues["creator"]
     console.log("creator",creator)
     const designNo = event.returnValues["designNo"].toString()
     console.log("designNo",designNo)
     await this.setState({ncreator:creator})
     await this.setState({ndesignNo:designNo})
     await this.setState({newDesignAvailableNot: true})
     await this.setState({notification: true});
     console.log("start")
     await delay(30000)
     console.log("finish")
     await this.setState({notification:false})
     await this.setState({newDesignAvailableNot: false})
}).on('changed', function(event){
 }).on('error', console.error);
 this.state.contract1.events.newPlayerAddition( function(error, event){ console.log(event); }).on('data', async (event) => {
  console.log("new player addition",event);
}).on('changed', function(event){
}).on('error', console.error);
  this.state.contract1.events.newPlayerRegistration( function(error, event){ console.log(event); }).on('data', async (event) =>{
   console.log("new player registration",event);
   const designNo = event.returnValues["design"].toString()
   console.log("designNo",designNo)
   const player = event.returnValues["player"]
   console.log("player",player)
   await this.setState({ndesignNo:designNo})
   await this.setState({nplayer:player})
   await this.setState({newPlayerAdditionNot: true})
   await this.setState({notification:true})
   console.log("start")
   await delay(30000)
   console.log("finish")
   await this.setState({notification:false})
   await this.setState({newPlayerAdditionNot: false})
}).on('changed', function(event){
}).on('error', console.error);
this.state.contract1.events.playerDesignReceived( function(error, event){ console.log(event); }).on('data', async (event) =>{
 console.log("player design received",event);
 const player = event.returnValues["player"]
 console.log("player",player)
 if (player == this.state.account){
   const designNo = event.returnValues["design"].toString()
   console.log("designNo",designNo)
   await this.setState({ndesignNo:designNo})
   await this.setState({playerDesignReceivedNot: true})
   await this.setState({notification:true})
   console.log("start")
   await delay(30000)
   console.log("finish")
   await this.setState({notification:false})
   await this.setState({playerDesignReceivedNot: false})
 }
 else console.log("wrong player")
}).on('changed', function(event){
}).on('error', console.error);
this.state.contract1.events.playerRevealed( function(error, event){ console.log(event); }).on('data', function(event){
 console.log(event);
}).on('changed', function(event){
}).on('error', console.error);
this.state.contract1.events.votingResult( function(error, event){ console.log("callback",event);this.setState({result : event.returnValues}) }).on('data', async(event) =>{
 console.log("on data",event);
 const resultReturned = event.returnValues.result.toString()
 console.log("resultReturned", resultReturned)
 this.setState({result : resultReturned});
}).on('changed', function(event){
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
      confirmPassword:'',
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
      registrationType : 'designer',
      designer : false,
      player : false,
      avaibleDesign : [],
      currentDesigns : false,
      invalidRegistration : false,
      invalidPassword : false,
      playerDetails: false,
      playerDet: [],
      designSel: '',
      designSelected: false,
      manager: false,
      currentDesignsM: false,
      playerList: [],
      designSelectedM: false,
      registeredDesigns: false,
      designVoted: false,
      voteSelected: "1",
      nounce: null,
      commited: false,
      calculateResult: false,
      result: 'no design selected',
      designSelCommit: '',
      reward:"0.00",
      penality:"0.00",
      setExpiry:"0",
      setReveal:"0",
      addPrinter: false,
      printerBrand: '',
      printerName:'',
      printerStrength:'3',
      printerFlexibility:'3',
      printerDurability:'3',
      printerDifficulty:'3',
      printTemperature:'',
      bedTemperature:'',
      solubleSupport:true,
      foodSafety:true,
      printerAddress:'',
      printReg:false,
//timer
      time: "0",
// event states
      notification: false,
      newDesignAvailableNot: false,
      ncreator: "",
      ndesignNo:"",
      newPlayerAdditionNot:false,
      nplayer: "",
      playerDesignReceivedNot:false
    }
  }


    timerCall() {
      this.timerID = setInterval(
        () => this.timer(),
        1000
      );
    }
async timer() {
  console.log(this.state.time)
  var time = this.state.time;
  if (time == 0){
    console.log("finished")
    clearInterval(this.timerID);
    return
  }
  time = time -1;
  await this.setState({time : time})

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
  if(wallet == "0x9Dd667c5d811C0930Ca639673EC269e1113f15bd") {
                                          console.log("manager setting")
                                          this.setState({manager: true})
                                          Cookies.set('manager','true')
                                        }
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
      this.setState({player : false})
      console.log("logged as designer")
    }
    else if (registrationType == "player") {
      this.setState({player : true})
      this.setState({designer : false})
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
    console.log(this.state.designer,this.state.player)
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
captureFileL5 = async (event)=> {
  event.preventDefault()
  console.log("charging confirm password")
  const stri = event.target.value
  await this.setState({ confirmPassword: stri })
  console.log(this.state.confirmPassword)
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
  const confirmPassword = this.state.confirmPassword
  if(confirmPassword == password)
  {
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
                                if(response.data == "success")
                                {
                                    await this.setState({register : false})
                                    if (registrationType == "player") {
                                             console.log("adding player phase")
                                             const web3 = window.web3
                                             const account = this.state.account
                                             console.log(account)
                                             const hash = keccak256(account);
                                             const fhash = '0x'+ hash
                                             console.log(hash)
                                             await web3.eth.personal.sign(fhash, account ,(err,res) =>{
                                                                   if(res){
                                                                         console.log("signature:", res)
                                                                         web3.eth.personal.ecRecover(fhash, res).then(console.log)
                                                                        this.state.contract.methods.addPlayer(fhash, res).send({from : account}).on('error', function(error){
                                                                          const string = error.message;
                                                                          const substring = "Player already added to the system.";
                                                                          const substring1 = "MetaMask Tx Signature: User denied transaction signature."
                                                                          const substring2 = "The registration identity verification failed."
                                                                          if(string){
                                                                          if(string.includes(substring)) console.log(substring)
                                                                          if(string.includes(substring1)) console.log(substring1)
                                                                          if(string.includes(substring2)) console.log(substring2)
                                                                          axios.post('http://127.0.0.1:5000/api/post3',{
                                                                            wallet : wallet
                                                                          }).then((respon) => {
                                                                            console.log(respon)
                                                                          })}
                                                                          return})
                                                                           }
                                                                   if(err){console.log("err");return}
                                                                 })
                                            console.log("printer details")
                                            this.setState({printReg : true})
                                                                }
                                     else if (registrationType == "both") {
                                            console.log("adding player phase (from both)")
                                            const web3 = window.web3
                                            const account = this.state.account
                                            console.log(account)
                                            const hash = keccak256(account);
                                            const fhash = '0x'+hash
                                            console.log(fhash)
                                            await web3.eth.personal.sign(fhash, account ,(err,res) =>{
                                                                  if(res){
                                                                        console.log("signature:", res)
                                                                        web3.eth.personal.ecRecover(fhash, res).then(console.log)
                                                                        this.state.contract.methods.addPlayer(fhash, res).send({from : account}).on('error', function(error){
                                                                          const string = error.message;
                                                                          const substring = "Player already added to the system.";
                                                                          const substring1 = "MetaMask Tx Signature: User denied transaction signature."
                                                                          const substring2 = "The registration identity verification failed."
                                                                          if(string){
                                                                          if(string.includes(substring)) console.log(substring)
                                                                          if(string.includes(substring1)) console.log(substring1)
                                                                          if(string.includes(substring2)) console.log(substring2)
                                                                          axios.post('http://127.0.0.1:5000/api/post3',{
                                                                            wallet : wallet
                                                                          }).then((respon) => {
                                                                            console.log(respon)
                                                                          })}
                                                                          return})
                                                                        }
                                                                   if(err){console.log("err");return}
                                                                   })
                                             console.log("printer details")
                                             this.setState({printReg : true})
                                                                  }
                                    else {
                                          console.log("designer")
                                          return
                                         }
                              }
                          else
                              {
                                console.log("invalid registration")
                                this.setState({invalidPassword : false})
                                this.setState({invalidRegistration : true})
                              }
                           });
}
else{
    console.log("invalid password")
    this.setState({invalidRegistration : false})
    this.setState({invalidPassword : true})
    return
   }
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
  Cookies.remove('manager')
  await this.setState({isLogged : false})
  await this.setState({announce : false})
  console.log(this.state.isLogged)
}
registrationType = async (selectedOption) => {
  console.log("type registration selected")
  const registrationType =  selectedOption.value
  console.log(this.state.registrationType)
  console.log(selectedOption.value)
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
  Cookies.remove('manager')
  await this.setState({isLogged : false})
  await this.setState({main : false})
  console.log(this.state.isLogged)
}
toCurrentDesigns = async (event) =>{
  event.preventDefault()
  console.log("to current designs")
  this.timerCall()
  this.state.contract.methods.getNumDesignes().call({from: this.state.account}).then( async (res) =>{
    var index = res.toString()
    Cookies.set('designIndex', index)
    console.log(index)
    let result1=[]
   for(var i=0; i<index; i++){
    await this.state.contract.methods.getDesigne(i).call({from: this.state.account}).then((r) =>{

      result1.push(r)
    })
    var currentTimeInSeconds=Math.floor(Date.now()/1000);
    console.log("now timestamp",currentTimeInSeconds)
    var timestamp = result1[i].timestamp.toString()
    console.log("date uploading", timestamp)
    var expiry = result1[i].deltaExp.toString()
    console.log("expiry",expiry)
    var expired = +timestamp + +expiry
    console.log("expired time",expired)
    var expired = +expired - +currentTimeInSeconds
    if(expired <= 0)result1[i]["expired"] = "expired"
    if (expired > 0)result1[i]["expired"] = "avaible"
    console.log("avaibility",result1[i].expired)
    console.log("decoding")
  if(result1[i] !='undefinied'){  var tmp = this.getIpfsHashFromBytes32(result1[i].filehash)
    tmp = "https://ipfs.infura.io/ipfs/"+tmp
    console.log(tmp)
    result1[i].filehash=tmp
    result1[i]["designNo"] = i
    console.log(result1)
    this.setState({avaibleDesign : result1})}
  }
  await this.setState({currentDesigns : true})
  await this.setState({main : false})
  Cookies.set('currentDesigns','true')
  Cookies.remove('main')
  })

}
toPlayerDetails =  (event) =>{
  event.preventDefault()
  console.log("to Player details")
  const address = this.state.account
  console.log(address)
  this.state.contract.methods.getPlayerDetails(address).call({from: address}).then((r) =>{
    console.log(r)
    r[0]=r[0].toString()
    r[1]=r[1].toString()
    r[2]=r[2].toString()
    console.log(r)
    this.setState({playerDet: r})
    this.setState({playerDetails: true})
    this.setState({main : false})
    Cookies.remove('main')
    Cookies.set('playerDet', r)
    Cookies.set('playerDetails', 'true')
  })
}
toRegisteredDesigns = async (event) =>{
  event.preventDefault()
  console.log("to registered designs")
  const account = this.state.account
  this.state.contract.methods.getNumDesignes().call({from: this.state.account}).then( async (res) =>{
    var index = res.toString()
    console.log("num designes", index)
    Cookies.set('designVotingIndex', index)
    let result1=[]
    var result2="true"
    var k=0
   for(var i=0; i<index; i++){
     await this.state.contract.methods.getRegPlayerAddresses(i).call({from: this.state.account}).then( async(re) =>{
       const addresses = re
       console.log("addresses", addresses)
       const isRegistered = addresses.includes(account)
       console.log("is registered:",isRegistered)
       if (isRegistered == true){
         await this.state.contract.methods.getDesigne(i).call({from: this.state.account}).then((r) =>{
           result1.push(r)
           console.log("result",k,result1)
           result2="true"
         })
       }
       else{
         console.log("not registered")
         result2="false"
         k=k-1
       }
     })
   console.log("decoding")
   console.log("result",result1[k])
  if(result2=="true")  {
    var currentTimeInSeconds=Math.floor(Date.now()/1000);
    console.log("now timestamp",currentTimeInSeconds)
    var timestamp = result1[k].timestamp.toString()
    console.log("date uploading", timestamp)
    var expiry = result1[k].deltaExp.toString()
    console.log("expiry",expiry)
    var expired = +timestamp + +expiry
    console.log("expired time",expired)
    var expired = +expired - +currentTimeInSeconds
    if(expired <= 0)result1[k]["expired"] = "expired"
    if (expired > 0)result1[k]["expired"] = "avaible"
    console.log("avaibility",result1[k].expired)
    var tmp = this.getIpfsHashFromBytes32(result1[k].filehash)
    tmp = "https://ipfs.infura.io/ipfs/"+tmp
    console.log(tmp)
    result1[k].filehash=tmp
    result1[k]["designNo"] = i
    console.log(result1)
    this.setState({avaibleDesign : result1})
  }
  k=k+1
  }
  await this.setState({registeredDesigns : true})
  Cookies.set('registeredDesigns', 'true')
  await this.setState({main : false})
  Cookies.remove('main')
  })

}

toCalculateResult = async (event) =>{
  event.preventDefault()
  console.log("to calculateResult")
  this.state.contract.methods.getNumDesignes().call({from: this.state.account}).then( async (res) =>{
    var index = res.toString()
    Cookies.set('calculateResultIndex', index)
    console.log(index)
    let result1=[]
    var result2="true"
    var k=0
   for(var i=0; i<index; i++){
    await this.state.contract.methods.getDesigne(i).call({from: this.state.account}).then((r) =>{
      if (r.vendor == this.state.account) {
        result1.push(r)
        result2="true"
      }
      else{
        result2="false"
        k=k-1
      }
    })
    console.log("decoding")
    if(result2=="true"){  var tmp = this.getIpfsHashFromBytes32(result1[k].filehash)
    tmp = "https://ipfs.infura.io/ipfs/"+tmp
    console.log(tmp)
    result1[k].filehash=tmp
    result1[k]["designNo"] = i
    console.log(result1)
    this.setState({avaibleDesign : result1})}
    k=k+1
  }
  })
  await this.setState({calculateResult : true})
  await this.setState({main : false})
  Cookies.set('calculateResult','true')
  Cookies.remove('main')
}
toAddPrinter = async (event) =>{
  event.preventDefault()
  console.log("to add printer")
  await this.setState({addPrinter:true})
  await this.setState({main : false})
  Cookies.set('addPrinter','true')
  Cookies.remove('main')
}
//end main part







//PLayer details
toMainPd = async (event) => {
  event.preventDefault()
  console.log("to Main")
  Cookies.remove('playerDetails')
  Cookies.remove('playerDet')
  await this.setState({playerDetails : []})
  await this.setState({playerDetails : false})
  await this.setState({main : true})
  Cookies.set('main','true')
}
refreshPd = (event) =>{
  event.preventDefault()
  console.log("refreshing")
  const address = this.state.account
  console.log(address)
  this.state.contract.methods.getPlayerDetails(address).call({from: address}).then((r) =>{
    console.log(r)
    r[0]=r[0].toString()
    r[1]=r[1].toString()
    r[2]=r[2].toString()
    console.log(r)
    this.setState({playerDet: r})
    Cookies.set('playerDet', r)
  })
}
//End Player details







//add printer
printerAddress = async (event) => {
console.log("charging printer address")
const stri = event.target.value
await this.setState({printerAddress: stri })
console.log(this.state.printerAddress)
}
printerBrand = async (event) => {
console.log("charging printer brand")
const stri = event.target.value
await this.setState({printerBrand: stri })
console.log(this.state.printerBrand)
}
printerName = async (event) => {
console.log("charging printer name")
const stri = event.target.value
await this.setState({printerName: stri })
console.log(this.state.printerName)
}
printerStrength = async (selectedOption) => {
  console.log("printer strength")
  const printerStrength =  selectedOption.value
  console.log(this.state.printerStrength)
  console.log(selectedOption.value)
  await  this.setState({printerStrength : printerStrength })
  console.log(this.state.printerStrength)
}
printerFlexibility = async (selectedOption) => {
  console.log("printer flexibility")
  const printerFlexibility =  selectedOption.value
  console.log(this.state.printerFlexibility)
  console.log(selectedOption.value)
  await  this.setState({printerFlexibility : printerFlexibility })
  console.log(this.state.printerFlexibility)
}
printerDurability = async (selectedOption) => {
  console.log("printer durability")
  const printerDurability =  selectedOption.value
  console.log(this.state.printerDurability)
  console.log(selectedOption.value)
  await  this.setState({printerDurability : printerDurability })
  console.log(this.state.printerDurability)
}
printerDifficulty = async (selectedOption) => {
  console.log("printer difficulty")
  const printerDifficulty =  selectedOption.value
  console.log(this.state.printerDifficulty)
  console.log(selectedOption.value)
  await  this.setState({printerDifficulty : printerDifficulty })
  console.log(this.state.printerDifficulty)
}
printTemperature = (event,valueAsNumber,valueAsString) =>{

  const temperature = event
  console.log(temperature)
  this.setState({printTemperature: temperature})
}
bedTemperature = (event,valueAsNumber,valueAsString) =>{

  const temperature = event
  console.log(temperature)
  this.setState({bedTemperature: temperature})
}
solubleSupport = async (selectedOption) => {
  console.log("soluble support")
  const solubleSupport = selectedOption.value
  console.log(this.state.solubleSupport)
  console.log(selectedOption.value)
  await  this.setState({solubleSupport : solubleSupport })
  console.log(this.state.solubleSupport)
}
foodSafety = async (selectedOption) => {
  console.log("food-safe printer")
  const foodSafety =  selectedOption.value
  console.log(this.state.foodSafety)
  console.log(selectedOption.value)
  await  this.setState({foodSafety : foodSafety })
  console.log(this.state.foodSafety)
}
toMainAD = async (event) => {
  event.preventDefault()
  console.log("to Main")
  Cookies.remove('addPrinter')
  await this.setState({addPrinter : false})
  await this.setState({main : true})
  Cookies.set('main','true')
}
toLoginAD = async (event) => {
  event.preventDefault()
  console.log("registration aborted")
  await this.setState({printReg : false})
  await this.setState({register : false})
}
sendDataPrinter = async (event) => {
  event.preventDefault()
  const web3 = window.web3
  console.log("sending printer details")
  const printerAddress = this.state.printerAddress
  console.log("printer address",printerAddress)
  const printerBrand = this.state.printerBrand
  console.log("printer brand",printerBrand)
  const abc = web3.utils.asciiToHex(printerBrand)
  var printerBrandCoded = web3.utils.stringToHex(printerBrand)
  console.log("printer brand coded",printerBrandCoded)
  printerBrandCoded = web3.utils.padRight(printerBrandCoded, 64)
  console.log("printer brand coded",printerBrandCoded,abc)
  const printerBrandDecoded = web3.utils.hexToString(printerBrandCoded)
  console.log("printer brand decoded",printerBrandDecoded)
  const printerName = this.state.printerName
  console.log("printer name",printerName)
  var printerNameCoded = web3.utils.stringToHex(printerName)
  console.log("printer name coded",printerNameCoded)
  printerNameCoded = web3.utils.padRight(printerNameCoded, 64)
  const printerNameDecoded = web3.utils.hexToString(printerNameCoded)
  console.log("printer name decoded",printerNameDecoded)
  const printerStrength = this.state.printerStrength
  console.log("printer strength",printerStrength)
  const printerFlexibility = this.state.printerFlexibility
  console.log("printer flexibility",printerFlexibility)
  const printerDurability = this.state.printerDurability
  console.log("printer durability",printerDurability)
  const printerDifficulty = this.state.printerDifficulty
  console.log("printer difficulty",printerDifficulty)
  const printTemperature = this.state.printTemperature
  console.log("print temperature",printTemperature)
  const bedTemperature = this.state.bedTemperature
  console.log("bed temperature",bedTemperature)
  const solubleSupport = this.state.solubleSupport
  console.log("soluble support",solubleSupport)
  const foodSafety = this.state.foodSafety
  console.log("food safety",foodSafety)
  if(printerAddress && printerBrand && printerName && printTemperature && bedTemperature ){
  this.state.contract.methods.addPrinter(printerAddress, printerBrandCoded, printerNameCoded, printerStrength, printerFlexibility, printerDurability, printerDifficulty, printTemperature, bedTemperature, solubleSupport, foodSafety).send({from : this.state.account }).on('error', function(error){
                        console.log(error);
                        const string = error.message
                        const substring = "MetaMask Tx Signature: User denied transaction signature.";
                        const substring1 = "Only registered player can add a printer.";
                        if(string){
                        if(string.includes(substring)) console.log(substring);
                        if(string.includes(substring1)) console.log(substring1);}
                               return})}
 else {
   console.log("missing input")
   return
 }
}
//end add printer







//current Designs part

toMainC = async (event) => {
  event.preventDefault()
  console.log("to Main")
  Cookies.remove('currentDesigns')
  Cookies.remove('designIndex')
   Cookies.remove('designSelectedM')
   await this.setState({avaibleDesign : []})
  await this.setState({currentDesigns : false})
  await this.setState({main : true})
  Cookies.set('main','true')
}
refreshC = (event) =>{
  event.preventDefault()
  this.state.contract.methods.getNumDesignes().call({from: this.state.account}).then( async (res) =>{
    var index = res.toString()
    Cookies.set('designIndex', index)
    console.log(index)
    let result1=[]
   for(var i=0; i<index; i++){
    await this.state.contract.methods.getDesigne(i).call({from: this.state.account}).then((r) =>{
      result1.push(r)
    })
    var currentTimeInSeconds=Math.floor(Date.now()/1000);
    console.log("now timestamp",currentTimeInSeconds)
    var timestamp = result1[i].timestamp.toString()
    console.log("date uploading", timestamp)
    var expiry = result1[i].deltaExp.toString()
    console.log("expiry",expiry)
    var expired = +timestamp + +expiry
    console.log("expired time",expired)
    var expired = +expired - +currentTimeInSeconds
    if(expired <= 0)result1[i]["expired"] = "expired"
    if (expired > 0)result1[i]["expired"] = "avaible"
    console.log("avaibility",result1[i].expired)
    console.log("decoding")
    var tmp = this.getIpfsHashFromBytes32(result1[i].filehash)
    console.log(result1[i].vendor)
    tmp = "https://ipfs.infura.io/ipfs/"+tmp
    console.log(tmp)
    result1[i].filehash=tmp
    result1[i]["designNo"] = i
    console.log(result1)
    this.setState({avaibleDesign : result1})
  }
  })
}
designSelected1 = (event) =>{
  event.preventDefault();
  const index = event.target.value
  console.log("selected designNo:", index)
  const design = this.state.avaibleDesign
  if (design[index].expired == "expired") {console.log("expired"); return}
  this.setState({designSel : index})
  this.setState({designSelected : true})
}
designSelected2 = (event) =>{
  event.preventDefault()
  const index =  this.state.designSel
  console.log("selected designNo:", index)
  const web3 = window.web3
  const account = this.state.account
  console.log(account)
  const hash = keccak256(account);
  const fhash = '0x'+hash
  console.log(fhash)
  web3.eth.personal.sign(fhash, account ,(err,res) =>{
                        if(res){
                          const amount1 = this.state.amount
                          console.log(amount1)
                          const amount = web3.utils.toWei(amount1.toString(), 'ether');
                              console.log("signature:", res)
                              web3.eth.personal.ecRecover(fhash, res).then(console.log)
                             this.state.contract.methods.register(fhash, res, index, amount).send({from : account, value: amount}).on('error', function(error){
                               const string = error.message;
                               const substring1 = "The registration identity verification failed.";
                               const substring = "MetaMask Tx Signature: User denied transaction signature."
                               const substring2 = "The commitment should be more than 0.";
                               const substring3 = "The registration didn't receive the commitment."
                               const substring4 = "The commitment should be greater than the penalty."
                               const substring5 = "No more registrations are accepted."
                               const substring6 = "Player already registered."
                               if(string){
                               if(string.includes(substring)) console.log(substring)
                               if(string.includes(substring1)) console.log(substring1)
                               if(string.includes(substring2)) console.log(substring2)
                               if(string.includes(substring3)) console.log(substring3)
                               if(string.includes(substring4)) console.log(substring4)
                               if(string.includes(substring5)) console.log(substring5)
                               if(string.includes(substring6)) console.log(substring6)}
                               return})
                                }
                        if(err){console.log("err");return}
                      })

}
//end current designs part







//registered designs part
toMainR = async (event) => {
  event.preventDefault()
  console.log("to Main")
  Cookies.remove('registeredDesigns')
  Cookies.remove('designVotingIndex')
   Cookies.remove('designSelectedM')
  await this.setState({registeredDesigns : false})
  await this.setState({main : true})
  Cookies.set('main','true')
}
preCommit = async (event) =>{
  event.preventDefault();
  const index = event.target.value
  console.log("selected designNo:", index)
  this.state.contract.methods.getDesigne(index).call({from: this.state.account}).then( async (res) => {
    var currentTimeInSeconds=Math.floor(Date.now()/1000);
    console.log("now timestamp",currentTimeInSeconds)
    var timestamp = res.timestamp.toString()
    console.log("date uploading", timestamp)
    var expiry = res.deltaExp.toString()
    console.log("expiry",expiry)
    var expired = +timestamp + +expiry
    console.log("expired time",expired)
    var expired = +expired - +currentTimeInSeconds
    await this.setState({time:expired})
    this.timerCall()
  })
  await this.setState({commited: false})
  await this.setState({designSelCommit : index})
  Cookies.set("designSelCommit", index)
  await this.setState({designVoted : true})
}
voteSelection = async (selectedOption) =>{
  console.log(this.state.voteSelected)
  const voteSelected = selectedOption.value
  await this.setState({voteSelected : voteSelected})
  console.log("vote selected", this.state.voteSelected)
}
commit = async (event) =>{
  event.preventDefault()
  const web3 = window.web3
  const nounce = Math.floor(Math.random() * 10000).toString()
  const hashNounce = keccak256(nounce)
  const fhashNounce = '0x'+hashNounce
   var votingVariables = Cookies.get('votingVariables')
   console.log(votingVariables)
   if(votingVariables) votingVariables = JSON.parse(votingVariables)
  console.log(votingVariables)
  if(!votingVariables) votingVariables = []
  console.log(votingVariables)
  await this.setState({nounce : fhashNounce})
  console.log("nounce",fhashNounce)
  const vote = this.state.voteSelected
  console.log("vote",vote)
  const string=vote+fhashNounce
  const cryptoCommitment = web3.utils.soliditySha3(vote, fhashNounce)
  const cryptoCommitment1 = keccak256(string)
  const fcryptoCommitment1 = '0x'+ cryptoCommitment
  console.log("cryptoCommitment",cryptoCommitment,fcryptoCommitment1)
  var currentTimeInSeconds=Math.floor(Date.now()/1000);
  console.log("timestamp",currentTimeInSeconds)
  const designNo = this.state.designSelCommit
  const variables = {designNo : designNo, nounce : fhashNounce, vote : vote, account: this.state.account}
  votingVariables.push(variables)
  console.log("cookie",votingVariables)
  console.log("designNo",designNo)
  this.state.contract.methods.commit(designNo, cryptoCommitment, currentTimeInSeconds).send({from : this.state.account }).on('error', (error) =>{
    const string = error.message;
    const substring = "MetaMask Tx Signature: User denied transaction signature."
    const substring1 = "The player can commit only when manager confirms design exchange.";
    const substring2 = "The player cannot vote after expiry.";
    if(string){
    if(string.includes(substring))  {
      console.log(substring)
      this.setState({commited: false})
      votingVariables.pop()
      Cookies.set('votingVariables',votingVariables)
    }
    if(string.includes(substring1)) {
      console.log(substring1)
      this.setState({commited: false})
      votingVariables.pop()
      Cookies.set('votingVariables',votingVariables)
    }
    if(string.includes(substring2)) {
      console.log(substring2)
      votingVariables.pop()
      this.setState({commited:false})
      Cookies.set('votingVariables',votingVariables)
    }}
    return})
 console.log("right commited")
 Cookies.set('votingVariables',votingVariables)
 this.setState({commited: true})
}
reveal = async (event) =>{
  event.preventDefault()
  console.log("reveal")
  const designNo = this.state.designSelCommit
  console.log("designNo",designNo)
  var currentTimeInSeconds=Math.floor(Date.now()/1000);
  console.log("timestamp",currentTimeInSeconds)
  const nounce = this.state.nounce
  console.log("nounce",nounce)
  const vote = this.state.voteSelected
  console.log("vote",vote)
   this.state.contract.methods.reveal(designNo, vote, nounce, currentTimeInSeconds).send({from : this.state.account }).on('error', function(error){
    const string = error.message;
    const substring = "MetaMask Tx Signature: User denied transaction signature."
    const substring1 = "The vote cannot be revealed after the expiry.";
    const substring2 = "The player did not commit to this.";
    if(string){
    if(string.includes(substring)) console.log(substring)
    if(string.includes(substring1)) console.log(substring1)
    if(string.includes(substring2)) console.log(substring2)}
    return})

}
//end registered designs part








//announce part
setCommit = (event, maskedvalue, floatvalue) => {
       this.setState({amount: floatvalue});
       console.log(floatvalue)
   }
setReward = (event, maskedvalue, floatvalue) => {
          this.setState({reward: floatvalue});
          console.log(floatvalue)
   }
setPenality = (event, maskedvalue, floatvalue) => {
             this.setState({penality: floatvalue});
             console.log(floatvalue)
  }
setExpiry = (event,valueAsNumber,valueAsString) =>{

  const expiry = event
  console.log(expiry)
  this.setState({setExpiry: expiry})
}
setReveal = (event) =>{
  const reveal = event
  console.log(reveal)
  this.setState({setReveal: reveal})
}
  formatSelect = async (selectedOption) => {
    console.log("format selected")
    const designFormat =  selectedOption.value
    console.log(this.state.designFormat)
    console.log(selectedOption.value)
    await  this.setState({designFormat : designFormat })
    console.log(this.state.designFormat)
  }

  captureFile = async (event) => {
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
      // this.state.contract.methods.getExpiry().call({from: this.state.account}).then((res) => {
         var hash = this.state.designHash
       console.log("inizio conv")
    const fhash = this.getBytes32FromIpfsHash(hash)
    const web3 = window.web3
      console.log("solo fixedhash",fhash)
      console.log(this.state.contract)
        //   console.log(res)
    var currentTimeInSeconds=Math.floor(Date.now()/1000);
           console.log(currentTimeInSeconds)
     const amount1 = this.state.amount
     console.log(amount1)
     const amount = web3.utils.toWei(amount1.toString(), 'ether');
          console.log(amount)
     var taur = this.state.reward
     taur = web3.utils.toWei(taur.toString(), 'ether');
     console.log("reward",taur)
     var taup = this.state.penality
     taup = web3.utils.toWei(taup.toString(), 'ether');
     console.log("penality",taup)
     const deltaExp = (this.state.setExpiry)*60
     console.log("expiry", deltaExp)
     const deltaReveal = (this.state.setReveal)*60
     console.log("reveal", deltaReveal)
     const manager = "0x9Dd667c5d811C0930Ca639673EC269e1113f15bd"
    console.log('start smart contract call')
    this.state.contract.methods.announce(fhash, currentTimeInSeconds, amount, manager, taur, taup, deltaExp, deltaReveal).send({from : this.state.account, value : amount }).on('transactionHash', function(hash){ console.log("Hash: " + hash);
}).on('error', function(error){
                          console.log(error);
                          const string = error.message
                          const substring = "MetaMask Tx Signature: User denied transaction signature.";
                          const substring1 = "The commitment should be more than 0.";
                          const substring2 = "The announcement didn't receive the commitment.";
                          if(string){
                          if(string.includes(substring)) console.log(substring);
                          if(string.includes(substring1)) console.log(substring1);
                          if(string.includes(substring2)) console.log(substring2);}
                                 return}).on('confirmation', function(confirmationNumber, receipt){
                                                                               console.log(receipt)
                                                                                }).on('receipt', function(receipt){
                                                                                         console.log("provareceipt")
                                                                           })/*})*/
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





//calculate result part
toMainCR = async (event) => {
  event.preventDefault()
  console.log("to Main")
  Cookies.remove('calculateResult')
  Cookies.remove('calculateResultIndex')
  Cookies.remove('designIndex')
  Cookies.remove('designSel')
  Cookies.remove('designSelectedM')
  await this.setState({calculateResult : false})
  await this.setState({designSelectedM: false})
  await this.setState({main : true})
  Cookies.set('main','true')
}
calculateResult = (event) =>{
  event.preventDefault()
  console.log("calculating")
  var currentTimeInSeconds=Math.floor(Date.now()/1000);
         console.log("timestamp", currentTimeInSeconds)
  const designNo = event.target.value
  console.log("designNo", designNo)
  this.state.contract.methods.calculateResult(designNo, currentTimeInSeconds).send({from : this.state.account }).on('error', function(error){
   const string = error.message;
   const substring = "MetaMask Tx Signature: User denied transaction signature.";
   const substring1 = "The result cannot be revealed before the expiry.";
   const substring2 = "The voting is already finished and results are declared.";
if(string){
   if(string.includes(substring)) console.log(substring)
   if(string.includes(substring1)) console.log(substring1)
   if(string.includes(substring2)) console.log(substring2)}
   return})
}
//end calculate result






  //manager part
toCurrentDesignsM = async (event) =>{
  event.preventDefault()
  console.log("to current designs")
  this.state.contract.methods.getNumDesignes().call({from: this.state.account}).then( async (res) =>{
    var index = res.toString()
    Cookies.set('designIndex', index)
    console.log(index)
    let result1=[]
   for(var i=0; i<index; i++){
    await this.state.contract.methods.getDesigne(i).call({from: this.state.account}).then((r) =>{
      result1.push(r)
    })
    var currentTimeInSeconds=Math.floor(Date.now()/1000);
    console.log("now timestamp",currentTimeInSeconds)
    var timestamp = result1[i].timestamp.toString()
    console.log("date uploading", timestamp)
    var expiry = result1[i].deltaExp.toString()
    console.log("expiry",expiry)
    var expired = +timestamp + +expiry
    console.log("expired time",expired)
    var expired = +expired - +currentTimeInSeconds
    if(expired <= 0)result1[i]["expired"] = "expired"
    if (expired > 0)result1[i]["expired"] = "avaible"
    console.log("avaibility",result1[i].expired)
    console.log("decoding")
    var tmp = this.getIpfsHashFromBytes32(result1[i].filehash)
    tmp = "https://ipfs.infura.io/ipfs/"+tmp
    console.log(tmp)
    result1[i].filehash=tmp
    result1[i]["designNo"] = i
    console.log(result1)
    this.setState({avaibleDesign : result1})
  }
  })
  await this.setState({currentDesignsM : true})
  await this.setState({main : false})
  Cookies.set('currentDesignsM','true')
  Cookies.remove('main')
}





toMainCM = async (event) => {
  event.preventDefault()
  console.log("to Main")
  Cookies.remove('currentDesignsM')
  Cookies.remove('designIndex')
  Cookies.remove('designSel')
  Cookies.remove('designSelectedM')
  await this.setState({currentDesignsM : false})
  await this.setState({designSelectedM: false})
  await this.setState({main : true})
  Cookies.set('main','true')
}
designSelected1M = (event) =>{
  event.preventDefault();
  const index = event.target.value
  console.log("selected designNo:", index)
  this.setState({designSel : index})
  Cookies.set('designSel', index)
  this.setState({designSelectedM : true})
  Cookies.set('designSelectedM','true')
   this.setState({currentDesignsM : false})
   Cookies.remove('currentDesignsM')
     this.state.contract.methods.getRegPlayerAddresses(index).call({from: this.state.account}).then((r) =>{
      const result1=r
      console.log(result1)
      this.setState({playerList : result1})
    })
}
designSelected2M = (event) =>{
  event.preventDefault()
  const playerAddress =  event.target.value
  const designNo = this.state.designSel
  console.log("design selected:", designNo)
  console.log("selected player:", playerAddress)
  const web3 = window.web3
  this.state.contract.methods.isFileReceived(playerAddress, designNo).call({from: this.state.account}).then((res) =>{
               if(res == false){
                 this.state.contract.methods.setReceived(designNo, playerAddress).send({from: this.state.account}).on('error', function(error){
                   const string = error.message;
                   const substring = "MetaMask Tx Signature: User denied transaction signature."
                   const substring1 = "Only manager can call this function."
                   if(string){
                   if(string.includes(substring)) console.log(substring)
                   if(string.includes(substring1)) console.log(substring1)}
                   return})
               }
             else if(res == true){
               console.log("File already received")
               return
             }
             else{
               console.log("error")
             }
  })


}
refreshCM = (event) =>{
  event.preventDefault()
if(this.state.currentDesignsM == true){
  this.state.contract.methods.getNumDesignes().call({from: this.state.account}).then( async (res) =>{
    var index = res.toString()
    Cookies.set('designIndex', index)
    console.log(index)
    let result1=[]
   for(var i=0; i<index; i++){
    await this.state.contract.methods.getDesigne(i).call({from: this.state.account}).then((r) =>{
      result1.push(r)
    })
    var currentTimeInSeconds=Math.floor(Date.now()/1000);
    console.log("now timestamp",currentTimeInSeconds)
    var timestamp = result1[i].timestamp.toString()
    console.log("date uploading", timestamp)
    var expiry = result1[i].deltaExp.toString()
    console.log("expiry",expiry)
    var expired = +timestamp + +expiry
    console.log("expired time",expired)
    var expired = +expired - +currentTimeInSeconds
    if(expired <= 0)result1[i]["expired"] = "expired"
    if (expired > 0)result1[i]["expired"] = "avaible"
    console.log("avaibility",result1[i].expired)
    console.log("decoding")
    var tmp = this.getIpfsHashFromBytes32(result1[i].filehash)
    tmp = "https://ipfs.infura.io/ipfs/"+tmp
    console.log(tmp)
    result1[i].filehash=tmp
    result1[i]["designNo"] = i
    console.log(result1)
    this.setState({avaibleDesign : result1})
  }
})}
if(this.state.designSelectedM == true){
  const index = this.state.designSel
  this.state.contract.methods.getRegPlayerAddresses(index).call({from: this.state.account}).then((r) =>{
   const result1=r
   console.log(result1)
   this.setState({playerList : result1})
 })
}
}
//end manager part



  render() {
    function expiryFormat(num) {
    return num + ' Minutes';
}
    function printTemperatureFormat(num) {
    return num + ' Celsius';
}
    return (
<div>

                {/* loading part*/}
                {(this.state.loading) && (<h1 id="param35">Loading</h1>)}
                {(this.state.loading) && (<Navbar bg="pri" expand="lg" fixed="top" variant="light">
                <Navbar.Brand >Marketplace</Navbar.Brand>
                <Nav className="mr-auto">
                </Nav>
                </Navbar>)}
                {/*end loading part*/}
                {/*login section*/}
                {(!this.state.isLogged && !this.state.loading && !this.state.addPrinter && !this.state.printReg) && (<Navbar bg="pri" expand="lg" fixed="top" variant="light">
                <Navbar.Brand >Marketplace</Navbar.Brand>
                <Nav className="mr-auto">
                </Nav>
                </Navbar>)}
                {(!this.state.isLogged && !this.state.loading && !this.state.addPrinter && !this.state.printReg) && (<div class="container" >
                <div class="login">

                {(!this.state.isLogged && !this.state.loading && !this.state.register && !this.state.addPrinter && !this.state.printReg) && (<h1>Login </h1>)}
                {(!this.state.isLogged && !this.state.loading && this.state.register && !this.state.addPrinter && !this.state.printReg) && (<h1>User data</h1>)}
                {/* user logged with metamask */}event.target.value
                <form>
                {(this.state.ethBrowser && !this.state.isLogged && !this.state.loading && !this.state.addPrinter && !this.state.printReg) && (
                <p><input type="text" placeholder="username" onChange={this.captureFileL} /></p>
              )}
                </form>
                {(this.state.ethBrowser && !this.state.isLogged && !this.state.loading && !this.state.addPrinter && !this.state.printReg) && (
                <p><input type="password" placeholder="password" onChange={this.captureFileL1} /></p>
                )}
                {(this.state.ethBrowser && !this.state.isLogged && !this.state.loading && this.state.register && !this.state.addPrinter && !this.state.printReg) && (
                <p><input type="password"  placeholder="confirm password" onChange={this.captureFileL5} /></p>
                )}
                {(this.state.invalidLogin && !this.state.isLogged && this.state.ethBrowser && !this.state.loading && !this.state.addPrinter && !this.state.printReg && !this.state.register) && (<div id="param6">invalid username/password</div>)
                }
                { (this.state.register && this.state.ethBrowser && !this.state.isLogged && !this.state.loading && !this.state.addPrinter && !this.state.printReg) ?

                <p><input type="text" placeholder="name" onChange={this.captureFileL3} /></p>
                  : null
                }
                { (this.state.register && this.state.ethBrowser && !this.state.isLogged && !this.state.loading && !this.state.addPrinter && !this.state.printReg) ?

                <p><input type="text" placeholder="surname" onChange={this.captureFileL4} /></p>
                 : null
                }
                { (this.state.register && this.state.ethBrowser && !this.state.isLogged && !this.state.loading && !this.state.addPrinter && !this.state.printReg ) ?

                <p><input type="text"  placeholder="email" onChange={this.captureFileL2} /></p>
                  : null
                }
                {(this.state.register && this.state.ethBrowser && this.state.invalidEmail && !this.state.isLogged && !this.state.loading && !this.state.addPrinter  && !this.state.printReg) && (
                 <div id="param10">invalid email</div>)
                 }

                { (!this.state.register && this.state.ethBrowser && !this.state.isLogged && !this.state.loading && !this.state.addPrinter  && !this.state.printReg) && (
                <p><Button variant='outline-secondary' size="sm" onClick={this.startApi2}>Login</Button></p>)
                }

                { (!this.state.register && this.state.ethBrowser  && !this.state.isLogged && !this.state.loading && !this.state.addPrinter  && !this.state.printReg)  && (
                  <a href="#" onClick={this.setRegister} id="param34">Not have an account?</a>)
                }

                {(this.state.register && this.state.ethBrowser  && !this.state.isLogged && !this.state.loading && !this.state.addPrinter  && !this.state.printReg) && (
               <label><br/>
               <Select className="selectReact" onChange={this.registrationType} defaultValue={ {value: 'designer', label: 'Registration Type:'} } options = {options} />
               </label>
              )}
              {(this.state.register && this.state.ethBrowser && this.state.invalidRegistration && !this.state.isLogged && !this.state.loading && !this.state.addPrinter  && !this.state.printReg) && (
               <div id="param15">Username or wallet already registered</div>)
               }
               {(this.state.register && this.state.ethBrowser && this.state.invalidPassword && !this.state.isLogged && !this.state.loading && !this.state.addPrinter ) && (
                <div id="param18">Password and Confirm Password are different</div>)
                }
                { (this.state.register && this.state.ethBrowser && !this.state.isLogged && !this.state.loading && !this.state.addPrinter  && !this.state.printReg) && (
                  <p><Button variant='outline-secondary' size='lg' onClick={this.sendData}>Send </Button></p>)
                }

                { (this.state.register && this.state.ethBrowser && !this.state.isLogged && !this.state.loading && !this.state.addPrinter  && !this.state.printReg) && (
                  <p><Button variant='outline-secondary' size='sm' onClick={this.Return}>Return </Button></p>)
                }

                {/* end user logged with metamask*/}
                {/*user without metamask*/}
                {(!this.state.ethBrowser && !this.state.isLogged && !this.state.loading && !this.state.loading) && (<div >Non-Ethereum browser detected, please install metamask.<br />
                [.....metamask tutorial <a href={'https://metamask.io/download.html'}>here</a>...]
                </div>)}
                {/*user without metamask*/}
                </div>
                </div>)}
                {/*end login section*/}






                {/*notifications*/}

                {(this.state.isLogged && this.state.ethBrowser && !this.state.loading && this.state.notification) && (<div id="param33">notifications</div>)
                }
                {(this.state.isLogged && this.state.ethBrowser && !this.state.loading && this.state.notification && this.state.newDesignAvailableNot && this.state.player) &&
                  (<div id="param32">new design avaible designNo:{this.state.ndesignNo},vendor:{this.state.ncreator}</div>)
                }
                {(this.state.isLogged && this.state.ethBrowser && !this.state.loading && this.state.notification && this.state.newDesignAvailableNot && this.state.manager) &&
                  (<div id="param32">new player addition designNo:{this.state.ndesignNo},player:{this.state.nplayer}</div>)
                }
                {(this.state.isLogged && this.state.ethBrowser && !this.state.loading && this.state.notification && this.state.playerDesignReceivedNot && this.state.player) &&
                  (<div id="param32">design received designNo:{this.state.ndesignNo}</div>)
                }
                {/*notifications*/}







                {/*main section*/}
                { (this.state.ethBrowser && this.state.isLogged && this.state.main && !this.state.loading && this.state.designer && !this.state.player ) && (
                 <div>
                  <Navbar bg="pri" expand="lg" fixed="top" variant="light">
                  <Navbar.Brand >Marketplace</Navbar.Brand>
                  <Nav className="mr-auto">
                  <NavDropdown title="My designs" id="basic-nav-dropdown">
                       <NavDropdown.Item href="#" onClick={this.toUpload}>Upload a design</NavDropdown.Item>
                       <NavDropdown.Item href="#" onClick={this.toCalculateResult}>Calculate Result</NavDropdown.Item>
                  </NavDropdown>
                  <Nav.Link href="#" onClick={this.logoutU}>Logout</Nav.Link>
                  </Nav>
                  </Navbar>
                </div>
                )}
                { (this.state.ethBrowser && this.state.isLogged && this.state.main && !this.state.loading && !this.state.manager && this.state.player && !this.state.designer ) && (
                 <div>
                  <Navbar bg="pri" expand="lg" fixed="top" variant="light">
                  <Navbar.Brand >Marketplace</Navbar.Brand>
                  <Nav className="mr-auto">
                  <Nav.Link href="#" onClick={this.toPlayerDetails} >Player details</Nav.Link>
                  <Nav.Link href="#"  onClick={this.toAddPrinter}>Add printer</Nav.Link>
                  <NavDropdown title="Designs" id="basic-nav-dropdown">
                       <NavDropdown.Item href="#" onClick={this.toCurrentDesigns}>List available design to vote</NavDropdown.Item>
                       <NavDropdown.Item href="#" onClick={this.toRegisteredDesigns}>Vote registered design</NavDropdown.Item>
                  </NavDropdown>
                  <Nav.Link href="#" onClick={this.logoutU}>Logout</Nav.Link>
                  </Nav>
                  </Navbar>
                </div>
                )}
                { (this.state.ethBrowser && this.state.isLogged && this.state.main && !this.state.loading && !this.state.manager && this.state.player && this.state.designer ) && (
                 <div>
                  <Navbar bg="pri" expand="lg" fixed="top" variant="light">
                  <Navbar.Brand >Marketplace</Navbar.Brand>
                  <Nav className="mr-auto">
                  <Nav.Link href="#" onClick={this.toPlayerDetails} >Player details</Nav.Link>
                  <Nav.Link href="#"  onClick={this.toAddPrinter}>Add printer</Nav.Link>
                  <NavDropdown title="My designs" id="basic-nav-dropdown">
                       <NavDropdown.Item href="#" onClick={this.toUpload}>Upload a design</NavDropdown.Item>
                       <NavDropdown.Item href="#" onClick={this.toCalculateResult}>Calculate Result</NavDropdown.Item>
                  </NavDropdown>
                  <NavDropdown title="Designs" id="basic-nav-dropdown">
                       <NavDropdown.Item href="#" onClick={this.toCurrentDesigns}>List available design to vote</NavDropdown.Item>
                       <NavDropdown.Item href="#" onClick={this.toRegisteredDesigns}>Vote registered design</NavDropdown.Item>
                  </NavDropdown>
                  <Nav.Link href="#" onClick={this.logoutU}>Logout</Nav.Link>
                  </Nav>
                  </Navbar>
                </div>
                )}
                { (this.state.ethBrowser && this.state.isLogged && this.state.main && !this.state.loading) && (<div><img className="logo1" src={logo} alt="loading..." /><h1 id="titleMainPage">Welcome {this.state.name}</h1>
                <h1 id="userData0">Your data:</h1><p id="userData3">name:</p><p id="userData4">{this.state.name}</p><p id="userData5">surname:</p><p id="userData6">{this.state.surname}</p><p id="userData7">email:</p><p id="userData8">{this.state.email}</p><p id="userData1">wallet:</p><p id="userData2">{this.state.account}
                 </p></div>)
                }


                {/*end main section*/}




                {/*see available design*/}
                { (this.state.ethBrowser && this.state.isLogged && !this.state.loading && this.state.player && this.state.currentDesigns && !this.state.manager ) &&
                    (<Navbar bg="pri" expand="lg" fixed="top" variant="light">
                    <Navbar.Brand >Marketplace</Navbar.Brand>
                    <Nav className="mr-auto">
                    <Nav.Link href="#" onClick={this.toMainC}>Home</Nav.Link>
                    </Nav>
                    </Navbar>)}
              { (this.state.ethBrowser && this.state.isLogged && !this.state.loading && this.state.player && this.state.currentDesigns && !this.state.manager ) &&
                  (<ul id="avaibleDesignsTable">
                    <Table   bordered hover size="sm">
           <thead>
              <tr>
               <th>Design Number</th>
               <th>creatorAddress</th>
               <th>design</th>
               <th>availability</th>
             </tr>
           </thead>
           <tbody>
             {this.state.avaibleDesign.map((item)=><tr id="customTable"  onClick={this.provaC}><td>{item.designNo.toString()}</td><td>{item.vendor.toString()}</td><td>{item.filehash.toString()}</td><td>{item.expired.toString()}</td><td><button  className="button" value={item.designNo.toString()} onClick={this.designSelected1}>Select</button></td></tr>)}
           </tbody>
         </Table>
         <p><Button variant="secondary" onClick={this.refreshC} >Refresh </Button></p>
         { (this.state.ethBrowser && this.state.isLogged && !this.state.loading && this.state.player && this.state.currentDesigns && this.state.designSelected && !this.state.manager) &&(
                      <p id="writtenText"> amount:
                         <CurrencyInput value={this.state.amount} onChangeEvent={this.setCommit}
                         CurrencyInput suffix=" ETH" /></p>)}

  { (this.state.ethBrowser && this.state.isLogged && !this.state.loading && this.state.player && this.state.currentDesigns && this.state.designSelected && !this.state.manager) && (
                    <p><Button variant="secondary" onClick={this.designSelected2}>Submit</Button></p>)}

                </ul>)}
                {/*see available design*/}


                {/*registered design*/}
                { (this.state.ethBrowser && this.state.isLogged && !this.state.loading && this.state.player && this.state.registeredDesigns && !this.state.manager ) &&
                    (<Navbar bg="pri" expand="lg" fixed="top" variant="light">
                    <Navbar.Brand >Marketplace</Navbar.Brand>
                    <Nav className="mr-auto">
                    <Nav.Link href="#" onClick={this.toMainR}>Home</Nav.Link>
                    </Nav>
                    </Navbar>)}
                { (this.state.ethBrowser && this.state.isLogged && !this.state.loading && this.state.player && this.state.registeredDesigns && !this.state.manager ) &&
                    (<ul id="registeredDesignPositition">
                      <Table className="table" bordered hover size="sm">
             <thead>
                <tr>
                 <th>Design Number</th>
                 <th>creatorAddress</th>
                 <th>design</th>
                 <th>availability</th>
               </tr>
             </thead>
             <tbody>
               {this.state.avaibleDesign.map((item)=><tr className="table"  onClick={this.provaC}><td>{item.designNo.toString()}</td><td>{item.vendor.toString()}</td><td>{item.filehash.toString()}</td><td>{item.expired.toString()}</td><td><button  className="button" value={item.designNo.toString()} onClick={this.preCommit}>Select</button></td></tr>)}
             </tbody>
           </Table>
           {(this.state.ethBrowser && this.state.isLogged && !this.state.loading && this.state.player && this.state.registeredDesigns && !this.state.manager && this.state.designVoted) && (<form >
           <label id="writtenText">
          Select design vote:
          <Select className="selectReact" onChange={this.voteSelection} defaultValue={ {value: '1', label: 'Select design vote:'} } options = {options1} />
     </label>
   </form>)}
   { (this.state.ethBrowser && this.state.isLogged && !this.state.loading && this.state.player && this.state.registeredDesigns && !this.state.manager && this.state.designVoted) && (<form>
      <button  className="button" onClick={this.commit}>Commit</button></form>)
   }
   { (this.state.ethBrowser && this.state.isLogged && !this.state.loading && this.state.player && this.state.registeredDesigns && !this.state.manager && this.state.designVoted && this.state.commited) && (<form>
      <button  className="button" onClick={this.reveal}>Reveal</button></form>)
   }
                  </ul>)}

                {/*registered design*/}





                {/*player details*/}
                { (this.state.ethBrowser && this.state.isLogged && !this.state.loading && this.state.player && this.state.playerDetails) &&
                  (<Navbar bg="pri" expand="lg" fixed="top" variant="light">
                  <Navbar.Brand >Marketplace</Navbar.Brand>
                  <Nav className="mr-auto">
                  <Nav.Link href="#" onClick={this.toMainPd}>Home</Nav.Link>
                  </Nav>
                  </Navbar>)}
                { (this.state.ethBrowser && this.state.isLogged && !this.state.loading && this.state.player && this.state.playerDetails) &&
                  (<ul>
                    <h1 id="playerDetailsTitle">Player details</h1><p id="playerDetails0">reputation:</p><p id="playerDetails1">{this.state.playerDet[0]}</p><p id="playerDetails2">weight:</p><p id="playerDetails3">{this.state.playerDet[1]}</p><p id="playerDetails4">balance:</p><p id="playerDetails5">{this.state.playerDet[2]}</p>
                </ul>)}
                { (this.state.ethBrowser && this.state.isLogged && !this.state.loading && this.state.player && this.state.playerDetails) && (
                  <Button variant="secondary"  onClick={this.refreshPd} id="playerDetails6">Refresh </Button>)
                }
                {/*end player details*/}






                {/*add printer*/}
                {(this.state.ethBrowser && this.state.isLogged && !this.state.loading && this.state.player && this.state.addPrinter) &&(<Navbar bg="pri" expand="lg" fixed="top" variant="light">
                <Navbar.Brand >Marketplace</Navbar.Brand>
                <Nav className="mr-auto">
                <Nav.Link href="#" onClick={this.toMainAD}>Home</Nav.Link>
                </Nav>
                </Navbar>)}

                {((this.state.ethBrowser && this.state.isLogged && !this.state.loading && this.state.player && this.state.addPrinter) || this.state.printReg) &&(<div class="container" >
                <div class="login">
                {((this.state.ethBrowser && this.state.isLogged && !this.state.loading && this.state.player && this.state.addPrinter) || this.state.printReg) && (<h1 >Printer details</h1>)}
                {((this.state.ethBrowser && this.state.isLogged && !this.state.loading && this.state.player && this.state.addPrinter) || this.state.printReg) && (
                <p><input type="text" placeholder="Printer address" onChange={this.printerAddress} /></p>
                )}
                {((this.state.ethBrowser && this.state.isLogged && !this.state.loading && this.state.player && this.state.addPrinter) || this.state.printReg) && (
                <p><input type="text" placeholder="Printer brand" onChange={this.printerBrand} /></p>
                 )}
                {((this.state.ethBrowser && this.state.isLogged && !this.state.loading && this.state.player && this.state.addPrinter) || this.state.printReg) && (
                <p><input type="text" placeholder="Printer name" onChange={this.printerName} /></p>
                )}
                {((this.state.ethBrowser && this.state.isLogged && !this.state.loading && this.state.player && this.state.addPrinter) || this.state.printReg) && (<label><br/>
                <Select className="selectReact1" onChange = {this.printerStrength} defaultValue={ {value: '3', label: 'Select printer strength'} } options = {options2} />
                </label>

               )}
               {((this.state.ethBrowser && this.state.isLogged && !this.state.loading && this.state.player && this.state.addPrinter) || this.state.printReg) && (<label><br/>
               <Select className="selectReact1" onChange = {this.printerFlexibility} defaultValue={ {value: '3', label: 'Select printer flexibility'} } options = {options2} />
               </label>
              )}
              {((this.state.ethBrowser && this.state.isLogged && !this.state.loading && this.state.player && this.state.addPrinter) || this.state.printReg) && (<label><br/>
              <Select className="selectReact1" onChange = {this.printerDurability} defaultValue={ {value: '3', label: 'Select printer durability'} } options = {options2} />
              </label>
              )}
             {((this.state.ethBrowser && this.state.isLogged && !this.state.loading && this.state.player && this.state.addPrinter) || this.state.printReg) && (<label><br/>
             <Select className="selectReact1" onChange = {this.printerDifficulty} defaultValue={ {value: '3', label: 'Select printer difficulty'} } options = {options2} />
             </label>
            )}
            { ((this.state.ethBrowser && this.state.isLogged && !this.state.loading && this.state.player && this.state.addPrinter) || this.state.printReg) &&(<form>
                                    <NumericInput  placeholder="print temperature" min={0} step={1} format={printTemperatureFormat} mobile="auto" onChange={this.printTemperature}/>
                            </form>) }
           { ((this.state.ethBrowser && this.state.isLogged && !this.state.loading && this.state.player && this.state.addPrinter) || this.state.printReg) &&(<form>
                                    <NumericInput placeholder="bed temperature" min={0} step={1} format={printTemperatureFormat} mobile="auto" onChange={this.bedTemperature}/>
                            </form>) }
           {((this.state.ethBrowser && this.state.isLogged && !this.state.loading && this.state.player && this.state.addPrinter) || this.state.printReg) && (<label><br/>
           <Select className="selectReact1" onChange = {this.solubleSupport} defaultValue={ {value: 'true', label: 'soluble support'} } options = {options3} />
           </label>
            )}
           {((this.state.ethBrowser && this.state.isLogged && !this.state.loading && this.state.player && this.state.addPrinter) || this.state.printReg) && (<label><br/>
           <Select className="selectReact1" onChange = {this.foodSafety} defaultValue={ {value: 'true', label: 'food safe'} } options = {options3} />
           </label>
           )}
           { ((this.state.ethBrowser && this.state.isLogged && !this.state.loading && this.state.player && this.state.addPrinter) || this.state.printReg) && (
             <p><Button variant='outline-secondary' size='lg' onClick={this.sendDataPrinter}>Send</Button></p>
             )
           }
                { (this.state.ethBrowser && !this.state.loading  && this.state.printReg) && (
                  <p><Button variant='outline-secondary' size='lg' onClick={this.toLoginAD}>Return</Button></p>
                 )
                }
            </div>
          </div>)}

                {/*end add printer*/}









                {/*announce section*/}
                {(this.state.ethBrowser && this.state.isLogged && this.state.announce && !this.state.loading && this.state.designer) &&(<Navbar bg="pri" expand="lg" fixed="top" variant="light">
                <Navbar.Brand >Marketplace</Navbar.Brand>
                <Nav className="mr-auto">
                <Nav.Link href="#" onClick={this.toMainU}>Home</Nav.Link>
                </Nav>
                </Navbar>)}

                {(this.state.ethBrowser && this.state.isLogged && this.state.announce && !this.state.loading && this.state.designer) && (<h1 id="announce1">Uploaded design:</h1>)}
            {(this.state.ethBrowser && this.state.isLogged && this.state.announce && !this.state.loading && this.state.designer) && (<div id="box">
             <br/><br/><br/><br/><br/>NO DESIGN UPLOADED<br/><br/><br/><br/><br/><br/><br/><br/></div>)}
                {(this.state.ethBrowser && this.state.isLogged && this.state.disableStl && this.state.announce && !this.state.loading && this.state.stlFile && this.state.designer) ?
                       (<div id="positionBox"><STLViewer
                           onSceneRendered={(element) => {
                               console.log(element)
                           }}
                           sceneClassName="test-scene"
                           file={this.state.stlFile}
                           className="obj"
                           modelColor="#FF0000"/> </div>): null

                   }
               {(this.state.ethBrowser && this.state.isLogged && this.state.disableObj && this.state.announce && !this.state.loading && this.state.objFile && this.state.designer) ?
                      (<div id="positionBox">  <OBJViewer
                            onSceneRendered={(element) => {
                                console.log(element)
                            }}
                            sceneClassName="test-scene"
                            file={this.state.objFile}
                            className="obj"
                            modelColor="#FF0000"/> </div>) : null
                    }
                {(this.state.ethBrowser && this.state.isLogged && this.state.announce && !this.state.loading && this.state.designer) && (<div id="announce4">
                 <h2>Change design</h2>
                 <form >
                   <input type='file'  onChange={this.captureFile} />
                 <p>&nbsp;</p>
                 </form>
                  </div>)}
                <p>&nbsp;</p>
                {(this.state.ethBrowser && this.state.isLogged && this.state.announce && !this.state.loading && this.state.designer) && (<div class="container" id="announce2">
                <div class="login">
                <p><input type="text" placeholder="Design title" onChange={this.captureFile2} /></p>
                <p><textarea placeholder="Design description" onChange={this.captureFile5} /></p>
                <form id="announce3"> Commitment:
                               <p><CurrencyInput  value={this.state.amount} onChangeEvent={this.setCommit}
                               CurrencyInput suffix=" ETH" /></p></form>
                 <form id="announce3">
                              Reward amount:
                                  <CurrencyInput value={this.state.reward} onChangeEvent={this.setReward}
                                  CurrencyInput suffix=" ETH" />
                </form>
                <form id="announce3">
                               Penality amount:
                                    <CurrencyInput value={this.state.penality} onChangeEvent={this.setPenality}
                                    CurrencyInput suffix=" ETH" />
                </form>
                                        <p><NumericInput placeholder="Expiry time" min={0} max={120} step={1} format={expiryFormat} mobile="auto" onChange={this.setExpiry}/></p>
                                       <p><NumericInput placeholder="Reveal time" min={0} max={120} step={1} format={expiryFormat} mobile="auto" onChange={this.setReveal}/></p>
                                       <label><br/>
                                       <Select className="selectReact1" onChange = {this.formatSelect} defaultValue={ {value: 'stl', label: 'Select design format'} } options = {options4} />
                                       </label>
            <p><Button variant='outline-secondary' size='lg' onClick={this.onSubmit}>Submit</Button></p>
             </div>
              </div>)}
      {/*end announce section*/}









     {/*calculate result*/}
     {(this.state.ethBrowser && this.state.isLogged && !this.state.loading && this.state.designer && this.state.calculateResult && !this.state.manager) &&(<Navbar bg="pri" expand="lg" fixed="top" variant="light">
     <Navbar.Brand >Marketplace</Navbar.Brand>
     <Nav className="mr-auto">
     <Nav.Link href="#" onClick={this.toMainCR}>Home</Nav.Link>
     </Nav>
     </Navbar>)}
     { (this.state.ethBrowser && this.state.isLogged && !this.state.loading && this.state.designer && this.state.calculateResult && !this.state.manager) &&
         (<ul>
           <Table className="table" bordered hover size="sm">
  <thead>
     <tr>
      <th>Design Number</th>
      <th>design</th>
    </tr>
  </thead>
  <tbody>
    {this.state.avaibleDesign.map((item)=><tr className="table" id="customTable" onClick={this.provaC}><td>{item.designNo.toString()}</td><td>{item.filehash.toString()}</td><td><button  className="button" value={item.designNo.toString()} onClick={this.calculateResult}>Select</button></td></tr>)}
  </tbody>
</Table>
       </ul>)}
       { (this.state.ethBrowser && this.state.isLogged && !this.state.loading && this.state.designer && this.state.calculateResult && !this.state.manager) && (
         <p id="result">Result:{this.state.result}</p>)
       }
     {/*end calculate result*/}










      {/*manager part*/}
      {(this.state.ethBrowser && this.state.isLogged && this.state.main && !this.state.loading && this.state.player && this.state.manager) &&(<Navbar bg="pri" expand="lg" fixed="top" variant="light">
      <Navbar.Brand >Marketplace</Navbar.Brand>
      <Nav className="mr-auto">
      <Nav.Link href="#" onClick={this.toCurrentDesignsM}>validate registered players</Nav.Link>
      <Nav.Link href="#" onClick={this.logoutU}>Logout</Nav.Link>
      </Nav>
      </Navbar>)}



      {(this.state.ethBrowser && this.state.isLogged && !this.state.loading && this.state.player && (this.state.currentDesignsM || this.state.designSelectedM) && this.state.manager) &&(<Navbar bg="pri" expand="lg" fixed="top" variant="light">
      <Navbar.Brand >Marketplace</Navbar.Brand>
      <Nav className="mr-auto">
      <Nav.Link href="#" onClick={this.toMainCM}>Home</Nav.Link>
      </Nav>
      </Navbar>)}
      { (this.state.ethBrowser && this.state.isLogged && !this.state.loading && this.state.player && this.state.currentDesignsM && this.state.manager && !this.state.designSelectedM) &&
          (<ul>
            <Table className="table" bordered hover size="sm">
   <thead>
      <tr>
       <th>Design Number</th>
       <th>creatorAddress</th>
       <th>design</th>
       <th>availability</th>
     </tr>
   </thead>
   <tbody>
     {this.state.avaibleDesign.map((item)=><tr className="table" id="customTable" onClick={this.provaC}><td>{item.designNo.toString()}</td><td>{item.vendor.toString()}</td><td>{item.filehash.toString()}</td><td>{item.expired.toString()}</td><td><button  className="button" value={item.designNo.toString()} onClick={this.designSelected1M}>Select</button></td></tr>)}
   </tbody>
 </Table>
        </ul>)}
    { (this.state.ethBrowser && this.state.isLogged && !this.state.loading && this.state.player  && this.state.manager && this.state.designSelectedM) &&
            (<ul>
              <Table className="table" bordered hover size="sm">
     <thead>
        <tr>
         <th>Player Address</th>
       </tr>
     </thead>
     <tbody>
       {this.state.playerList.map((item)=><tr className="table" id="customTable" onClick={this.provaC}><td>{item.toString()}</td><td><button  className="button" value={item.toString()} onClick={this.designSelected2M}>Select</button></td></tr>)}
     </tbody>
   </Table>
          </ul>)}
        { (this.state.ethBrowser && this.state.isLogged && !this.state.loading && this.state.player && (this.state.currentDesignsM || this.state.designSelectedM) && this.state.manager) && (
          <Button variant="secondary"  onClick={this.refreshCM}>Refresh </Button>
          )
        }
      {/*end manager part*/}

</div>




    );
  }
}

export default App;
