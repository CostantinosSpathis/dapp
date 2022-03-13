import React, { Component } from 'react'
import Materialclass from '../../contract/abiclasses/Materialclass';
import Button from 'react-bootstrap/Button';

export class NewMaterial extends Component {

  constructor(props) {
    super(props)
  
    this.state = {
       contract: null,
       color : 0,
    }
    this.contract = new Materialclass()
  }

  test = async () => {
    await this.contract.AddMats(this.state.color);
  };
  getColor = async (event)=> {
    event.preventDefault()
    const colo = event.target.value
    await this.setState({color : colo})
    console.log(this.state.color)
}
  render() {
    return (
      <div>
      <h1>AGGIUNGI MATERIALE</h1>
      <input type="number" min="0"max="11"onChange={this.getColor}></input><br /><br />
      <Button variant="secondary" onClick={this.test}>Aggiungi Materiale</Button>
      </div>      
    )
  }
}

export default NewMaterial