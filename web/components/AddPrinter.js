import React from 'react';
//import Navbar from './Navbar';
import NumericInput from 'react-numeric-input';
import Select from 'react-select';
import Button from 'react-bootstrap/Button';

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
  const printerName = this.state.printerName
  console.log("printer name",printerName)
  const printerAddress = this.state.printerAddress
  console.log("printer address",printerAddress)
  //const web3 = window.web3
  //all data is taken from the respective states
  /*
  console.log("sending printer details")
  
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
  */
  const  enabledCheckBox= this.state.enabledCheckBox
  console.log("PLA",enabledCheckBox)

  const ABS = this.state.ABS
  console.log("ABS",ABS)

  const PETG = this.state.PETG
  console.log("PETG",PETG)
  /*
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

        <form>
        <NumericInput placeholder="printNozzles" min={0.1} step={0.1} format={printNozzleFormat} mobile="auto" onChange={this.printNozzles}/>
        </form>

        <label>
            <Select className="selectReact1" onChange = {this.printerStrength} defaultValue={{value: '3', label: "Select printer strenght"}}options={printerRange}/>
        </label>

        <label>
            <Select className="selectReact1" onChange = {this.printerFlexibility} defaultValue={{value: '3', label: "Select printer Flexibility"}}options={printerRange}/>
        </label>

        <label>
            <Select className="selectReact1" onChange = {this.printerDurability} defaultValue={{value: '3', label: "Select printer Durability"}}options={printerRange}/>
        </label>

        <label>
            <Select className="selectReact1" onChange = {this.printerDifficulty} defaultValue={{value: '3', label: "Select printer Difficulty"}}options={printerRange}/>
        </label>

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