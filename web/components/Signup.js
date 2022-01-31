import React, { Component, useState }  from 'react';
import designVoting from '../blockchain/src/abis/designVoting.json'
import { keccak256 } from 'js-sha3';
import App from '../App';
import Web3 from 'web3';
import Button from 'react-bootstrap/Button';




class Signup extends React.Component{

    constructor(props){
    super(props)
        this.state = {
            username:'',
            password:'',
            confirmPassword:'',
            privateKey:'',
            email:'',
            contract: null,
            register : false,
            ethBrowser : false,
            invalidEmail : false,
            name : '',
            account: null,
            surname : '',
        }
    }

count = async (event) =>{
    //count player
}


 loadAccount = async (event)=> {
    const web3 = window.web3
    const accounts = await web3.eth.getAccounts()
    this.setState({ account: accounts[0] })
    console.log(accounts)
    const hash = keccak256(accounts)
    console.log(hash)
    const fhash = '0x' + hash
    console.log(fhash)
    const networkId= await web3.eth.net.getId()
    console.log(networkId)
    const networkData = designVoting.networks[networkId]
    console.log(networkData)
    if(networkData){
        const contract = web3.eth.Contract(designVoting.abi,networkData.address)
        const contract1 = web3.eth.Contract(designVoting.abi,networkData.address)
        this.setState({ contract : contract,contract1 : contract1 })
    }
   await web3.eth.personal.sign(fhash, accounts ,(err,res) =>{
                                                                      if(res){
                                                                            console.log("signature:", res)
            //test function to check the result of the signature in the console, if the signature is correct it should account value be shown
                                                                            web3.eth.personal.ecRecover(fhash, res).then(console.log)
            //to be able to call a function of the smart contract you must use the function this.state.contract.methods.functionName
                                                                           this.state.contract.methods.addPlayer(fhash, res).send({from : accounts}).on('error', function(error){
            //errors are the error messages sent by the smart contract if the invocation has not occurred with success
                                                                             const string = error.message;
                                                                             const substring = "Player already added to the system.";
                                                                             const substring1 = "MetaMask Tx Signature: User denied transaction signature."
                                                                             const substring2 = "The registration identity verification failed."
                                                                             if(string){
                                                                             if(string.includes(substring)) console.log(substring)
                                                                             if(string.includes(substring1)) console.log(substring1)
                                                                             if(string.includes(substring2)) console.log(substring2)
                                                                                }
                                                                             return})
                                                                              }
                                                                      if(err){console.log("err");return}
                                                                    })
  }
    render(){
    return(
    <div>
    <h1>Register</h1>
    <form>
    <p><input type="text" placeholder="Username" /></p>
    </form>
             <Button variant="secondary" onClick={this.loadAccount}>Click</Button>
    </div>

   )
   }

}

export default Signup;