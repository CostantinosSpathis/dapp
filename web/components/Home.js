import React, { Component } from 'react'
import ether from '../images/ether.png'

export class Home extends Component {
  render() {
    return (
      <div className='container'>
        <h1>Air Factories 2.0</h1>
        <div>
        <img src={ether} />
        </div>
        <div className='paragraph'>
        <p>Lorem Ipsum</p>
        </div>
      </div>
    )
  }
}

export default Home