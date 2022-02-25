import React, { Component, useState }  from 'react';
import designVoting from '../blockchain/src/abis/designVoting.json'
import { keccak256 } from 'js-sha3';
import App from '../App';
import Web3 from 'web3';
import Button from 'react-bootstrap/Button';
import Maps from './Maps';




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
            enabledCheckBox: false,
        }
    }

count = async (event) =>{
    //count player
}

onClick = () => {
    this.setState({ enabledCheckBox: !this.state.enabledCheckBox });
  };

changeUser = async (event)=> {
    event.preventDefault()
    console.log("charging username");
    const stri = event.target.value
    await this.setState({username : stri})
    console.log(this.state.username)
}

  test = () => {
    const username = this.state.username;
    console.log("user",username)
    const maker = this.state.enabledCheckBox;
    console.log("maker",maker)
  };

    render(){
    return(
    <div className="container">
        <div className='login'>
    <h1>Register</h1>
    <form>
    <p><input type="text" placeholder="Username" onChange={this.changeUser} /></p>
    Vuoi creare un account Maker?
    <input type="checkbox" defaultChecked={this.state.enabledCheckBox} onChange={this.onClick} />


    </form>
             <Button variant="secondary" onClick={this.test}>Sign In</Button>
    </div>
    <Maps />
    </div>

   )
   }

}

export default Signup;