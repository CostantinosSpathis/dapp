import React from 'react';
import Signup from './Signup'; // per importare la connessione allo smart contract

import Button from 'react-bootstrap/Button';

class PlayerDetails extends React.Component{

constructor(props){
    super(props)
    this.state = {
    account: null,
    contract: null,
    playerDet: [],
    playerDetails: false
    }
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
  })
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

render(){
    return(
    <div>
    <h1>playerDetails</h1>
    <p id="playerDetails0">rep: </p>
    <p id="playerDetails1">{this.state.playerDet[0]}</p>
    <p id="playerDetails2">weight:</p>
    <p id="playerDetails3">{this.state.playerDet[1]}</p>
    <p id="playerDetails4">balance:</p>
    <p id="playerDetails5">{this.state.playerDet[2]}</p>
<Button variant="secondary"  onClick={this.refreshPd} id="playerDetails6">Refresh </Button>)
    </div>

    )
}
}
export default PlayerDetails;