import React, { useState,Component } from 'react';
//import Navbar from './Navbar';
import NumericInput from 'react-numeric-input';
import Select from 'react-select';
import Button from 'react-bootstrap/Button';
//import Scheduling from '../blockchain/src/abis/Scheduling.json'

const printerRange = [
  { value: '3', label: 'very high' },
  { value: '2', label: 'high' },
  { value: '1', label: 'medium' },
  { value: '0', label: 'low' }
];

const solrange = [
  { value: 'true', label: 'yes' },
  { value: 'false', label: 'no' }
];


class AddPrinter extends React.Component {

    constructor(props){
        super(props)
        this.state = {
        addPrinter: false,
              printerName:'',
              contract: null,
              printerStrength:'3',
              printerFlexibility:'3',
              printerDurability:'3',
              printerDifficulty:'3',
              printTemperature:'',
              printNozzles:'',
              bedTemperature:'',
              solubleSupport:true,
              foodSafety:true,
              printerAddress:'',
              printReg:false,
              enabledCheckBox: false,
              ABS: false,
              PETG:false,
              noz0: false,
              noz1: false,
              noz2: false,
              noz3: false,
              noz4:false,
              noz5:false,
              noz6:false,
              noz7:false,
              noz8:false,
              noz9:false,
        }
    }
    

    onClickPLA = () => {
      this.setState({ enabledCheckBox: !this.state.enabledCheckBox });
    };

    onClickABS = () => {
      this.setState({ ABS: !this.state.ABS });
    };

    onClickPETG = () => {
      this.setState({ PETG: !this.state.PETG });
    };

    onClicknoz0 = () => {
      this.setState({ noz0: !this.state.noz0 });
    };

    onClicknoz2 = () => {
      this.setState({ noz2: !this.state.noz2 });
    };

    onClicknoz3 = () => {
      this.setState({ noz3: !this.state.noz3 });
    };

    onClicknoz4 = () => {
      this.setState({ noz4: !this.state.noz4 });
    };

    onClicknoz5 = () => {
      this.setState({ noz5: !this.state.noz5 });
    };

    onClicknoz6 = () => {
      this.setState({ noz6: !this.state.noz6 });
    };

    onClicknoz7 = () => {
      this.setState({ noz7: !this.state.noz7 });
    };

    onClicknoz8 = () => {
      this.setState({ noz8: !this.state.noz8 });
    };

    onClicknoz9 = () => {
      this.setState({ noz9: !this.state.noz9 });
    };

    onClicknoz1 = () => {
      this.setState({ noz1: !this.state.noz1 });
    };

    changeNamePrinter = async (event)=> {
      event.preventDefault()
      const stri = event.target.value
      await this.setState({printerName : stri})
      console.log(this.state.printerName)
  }

 
  changeAddressPrinter = async (event)=> {
    event.preventDefault()
    const stri = event.target.value
    await this.setState({printerAddress : stri})
    console.log(this.state.printerAddress)
}


sendDataPrinter = async (event) => {
  event.preventDefault()
  interaction();
  const value = interaction()
  console.log(value)


  const printerName = this.state.printerName
  console.log("printer name",printerName)
  const printerAddress = this.state.printerAddress
  console.log("printer address",printerAddress)

  const  enabledCheckBox= this.state.enabledCheckBox
  console.log("PLA",enabledCheckBox)

  const ABS = this.state.ABS
  console.log("ABS",ABS)

  const PETG = this.state.PETG
  console.log("PETG",PETG)

  const noz0 = this.state.noz0
  console.log("noz0",noz0)

  const noz1 = this.state.noz1
  console.log("noz1",noz1)

  const noz2 = this.state.noz2
  console.log("noz2",noz2)

  const noz3 = this.state.noz3
  console.log("noz3",noz3)

  const noz4 = this.state.noz4
  console.log("noz4",noz4)

  const noz5 = this.state.noz5
  console.log("noz5",noz5)

  const noz6 = this.state.noz6
  console.log("noz6",noz6)

  const noz7 = this.state.noz7
  console.log("noz7",noz7)

  const noz8 = this.state.noz8
  console.log("noz8",noz8)

  const noz9 = this.state.noz9
  console.log("noz9",noz9)
  /*
  if(printerName){
  Schedul.methods.addPrinter(printerName).send({from : this.state.printerName }).on('error', function(error){
                        console.log(error);
                        const string = error.message
                        const substring = "MetaMask Tx Signature: User denied transaction signature.";
                        const substring1 = "Only registered player can add a printer.";
                        interaction();
                        if(string){
                        if(string.includes(substring)) console.log(substring);
                        if(string.includes(substring1)) console.log(substring1);}
                               return})}
 else {
   console.log("missing input")
   return
 }*/
}

  render() {

        function printTemperatureFormat(num){
        return num + 'Celsius';
        }

        function printNozzleFormat(numm){
          return numm +'mm';
        }

    return(
    <div className='container'>
    <h1>AddPrinter</h1>
        <div className="login">
        <p><input type="text" placeholder="Printer address" onChange={this.changeAddressPrinter}/></p>
        <p><input type="text" placeholder="Printer Name" onChange={this.changeNamePrinter}/></p>
        
        <label>
          SELECT SUPPORTED MATERIAL <br />
          PLA
        <input type="checkbox" defaultChecked={this.state.enabledCheckBox} onChange={this.onClickPLA} />
        ABS
        <input type="checkbox" defaultChecked={this.state.ABS} onChange={this.onClickABS} />
        PETG
        <input type="checkbox" defaultChecked={this.state.PETG} onChange={this.onClickPETG} />
        </label>

        <label>
          NOZZLES 0.1
        <input type="checkbox" defaultChecked={this.state.noz0} onChange={this.onClicknoz0} /> 
        0.2
        <input type="checkbox" defaultChecked={this.state.noz1} onChange={this.onClicknoz1} />  
        0.3
        <input type="checkbox" defaultChecked={this.state.noz2} onChange={this.onClicknoz2} />
        0.4        
        <input type="checkbox" defaultChecked={this.state.noz3} onChange={this.onClicknoz3} />
        0.5
        <input type="checkbox" defaultChecked={this.state.noz4} onChange={this.onClicknoz4} />
        0.6
        <input type="checkbox" defaultChecked={this.state.noz5} onChange={this.onClicknoz5} />
        0.7
        <input type="checkbox" defaultChecked={this.state.noz6} onChange={this.onClicknoz6} />
        0.8
        <input type="checkbox" defaultChecked={this.state.noz7} onChange={this.onClicknoz7} />
        0.9
        <input type="checkbox" defaultChecked={this.state.noz8} onChange={this.onClicknoz8} />
        1.00
        <input type="checkbox" defaultChecked={this.state.noz9} onChange={this.onClicknoz9} />


        </label>

        <form>
        <NumericInput placeholder="printNozzles" min={0.1} step={0.1} format={printNozzleFormat} mobile="auto" onChange={this.printNozzles}/>
        </form>


        <form>
        <NumericInput placeholder="printTemperature" min={0} step={1} format={printTemperatureFormat} mobile="auto" onChange={this.printTemperature}/>
        </form>

        <form>
        <NumericInput placeholder="bed temperature" min={0} step={1} format={printTemperatureFormat} mobile="auto" onChange={this.bedTemperature}/>
        </form>


        <label>
        <Select className="SelectReact1" onChange = {this.solubleSupport} defaultValue={{value:'true', label:'soluble support'}} options={solrange}/>
        </label>

        <label>
        <Select className="SelectReact1" onChange = {this.foodSafety} defaultValue={ {value: 'true',label: 'food-safe'} } options={solrange}/>
        </label>

        <p><Button variant='outline-secondary' size='lg' onClick={this.sendDataPrinter}>Send</Button></p>

        </div>
    </div>
    )
  }
}

export default AddPrinter;