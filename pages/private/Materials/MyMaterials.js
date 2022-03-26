import React, { Component } from 'react'
import OnBoardin from '../../../components/APIs/contracts/OnBoard';
import Button from 'react-bootstrap/Button';
import Material from './Material';

export class MyMaterials extends Component {
  
  constructor(props) {
    super(props)
  
    this.state = {
       contract: null,
       materials: []
      }
    this.contract = new OnBoardin()
  }

async componentDidMount(){

  var material = await this.contract.printMats();
  console.log(material)
  this.setState({ materials : material })
}


  render() {
    const MaterialList = this.state.materials.map(material =><Material material ={material} /> )
    return (
      <>
      <h1>I TUOI MATERIALI</h1>
      <div className='container'>
      {MaterialList}
      </div>
     {/*this.state.materials.map((m) =>{
      return <p> {m}</p>  
     }
    )*/} 
    </>
    )
  }
}

export default MyMaterials