import React, { Component, useState }  from 'react';

import Button from 'react-bootstrap/Button';
import Maps from '../../components/APIs/Maps/Maps';
import IUser from '../../components/APIs/contracts/userclass'



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
            dalleore: null,
            alleore: null
            
        }
        this.contract= new IUser()
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

  test = async () => {
    const username = this.state.username;
    const maker = this.state.enabledCheckBox;
    await this.contract.AddUser(username,maker)
  };

    render(){
        let box
        if(this.state.enabledCheckBox){
            box = <div>
                Dalle ore:
                <input type="time" min="00" max="24" onChange={this.state.dalleore}></input>< br/>
                Alle ore:
                <input type="time" min="00" max="24" onChange={this.state.alleore}></input>
            </div>
        }else{
            box=<div></div>
        }
    return(
    <div className="container">
        <div className='login'>
    <h1>Register</h1>
    <form>
    <p><input type="text" placeholder="Username" onChange={this.changeUser} /></p>
    Vuoi creare un account Maker?
    <input type="checkbox" defaultChecked={this.state.enabledCheckBox} onChange={this.onClick} />
        {box}
    </form>
             <Button variant="secondary" onClick={this.test}>Sign In</Button>
    </div>
    <Maps />
    </div>

   )
   }

}

export default Signup;