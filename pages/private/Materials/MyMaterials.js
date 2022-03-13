import React, { Component } from 'react'
import Materialclass from '../../contract/abiclasses/Materialclass';
import Button from 'react-bootstrap/Button';

export class MyMaterials extends Component {
  
  constructor(props) {
    super(props)
  
    this.state = {
       contract: null,
      }
    this.contract = new Materialclass()
  }



  test = async () => {
    for(var i =0; i<5;i++){
     //SOSTITUIRE POI CON LA STAMPA DELLE STAMPANTI
    }
    var mats = await this.contract.printMats();
    for(var m of mats){
      console.log(m);
    }
  }

  render() {
    return (
      <div>
      <h1>AGGIORNA/VEDI MATERIALI</h1>
      <Button variant="secondary" onClick={this.test}>Aggiorna materiale</Button>
      <Button variant="secondary" onClick={this.test}>Stampa Materiale</Button>
      </div>
    )
  }
}

export default MyMaterials