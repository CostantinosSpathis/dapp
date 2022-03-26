import React, { Component } from 'react'
import printstamp from '../../../components/APIs/contracts/printstamp'
import Button from 'react-bootstrap/Button';
import { Outlet, Link } from "react-router-dom";
import Printer from './Printer';

class MyPrinters extends Component {

constructor(props) {
  super(props)

  this.state = {
    printerAddress: '',
    printerName:'',
     contract: null,
     printers: []
  }
  this.contract = new printstamp()
}
/*
test = async () => {
  for(var i =0; i<5;i++){
   //SOSTITUIRE POI CON LA STAMPA DELLE STAMPANTI
  }
  var printer = await this.contract.printPrinters();
  for(var p of printer){
    console.log(p);
  }
  
};*/
async componentDidMount(){

  var printer = await this.contract.printPrinters();
  console.log(printer)
  this.setState({ printers : printer })
}

  render() { //WORK
    const PrintersList = this.state.printers.map(printer => <Printer printer = {printer} />)
    console.log(PrintersList)
    return (
      <div>
        <h1>Your Printers</h1>
        {/*<p><Button variant='outline-secondary' size='lg' onClick={this.test}>Visualizza le tue stampanti</Button></p>*/}
        <div className='container'>
        {PrintersList}
        </div>
      </div> //THIS.PRINTER IS UNDEFINED
    )
  }
}

export default MyPrinters