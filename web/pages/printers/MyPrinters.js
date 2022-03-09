import React, { Component } from 'react'
import printstamp from '../../contract/abiclasses/printstamp'
import Button from 'react-bootstrap/Button';
import { Outlet, Link } from "react-router-dom";

class MyPrinters extends Component {

constructor(props) {
  super(props)

  this.state = {
    printerAddress: '',
    printerName:'',
     contract: null,
  }
  this.contract = new printstamp()
}

test = async () => {
  for(var i =0; i<5;i++){
   //SOSTITUIRE POI CON LA STAMPA DELLE STAMPANTI
  }
  var printer = await this.contract.printPrinters();
  for(var p of printer){
    console.log(p);
  }
  
};

  render() {


    return (
      <div>
        <h1>Ciao !</h1>
        <p><Button variant='outline-secondary' size='lg' onClick={this.test}>Visualizza le tue stampanti</Button></p>
        <Button className ="button">
          <Link to="/ModifyMat">Modifica materiali</Link>
          </Button>
      </div> //THIS.PRINTER IS UNDEFINED
    )
  }
}

export default MyPrinters