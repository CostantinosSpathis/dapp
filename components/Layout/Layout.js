import React,{ useState } from 'react';
import { Outlet, Link } from "react-router-dom";
import Button from 'react-bootstrap/Button';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Navbar from 'react-bootstrap/Navbar';
import { render } from 'react-dom';
import logo from '../../static/img/logo.png'
import IUser from '../APIs/contracts/userclass';



export default class Layout extends React.Component{

  constructor(props) {
    super(props)
  
    this.state = {
       isMake: false, //STABILISCE QUALE NAVBAR FAR VISUALIZZARE
       accounts: null,
       contract: null,
       data: []

    }
    this.contract= new IUser()
  }


  test = async () => {
    return await this.contract.Check();
  };

  trigger = async () =>{
    if((await this.contract.Check())!=this.state.isMake){
    this.setState ({ isMake : true })
    }
  }

  componentDidMount(){
    this.test()
    
  }


  render(){
    let maker;  
    this.trigger()
    console.log(this.state.isMake)
    //console.log(this.state.isMake)
    //this.test()
    //console.log(this.state.isMake)
    if(this.state.isMake){
     maker=<div className='container' >
    <Navbar bg="pri" fixed="top" variant="light">
    <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <Button className='button'>
            <Link to="/" className='text-link'>Home</Link>
          </Button>
          {/*PRINTERS DROPDOWN*/}
          <NavDropdown title="Printers" id="basic-nav-dropdown" className='button'>
            <NavDropdown.Item href="/AddPrinter" className='text-link'>AddPrinters</NavDropdown.Item>
            <NavDropdown.Item href="/MyPrinters">My Printers</NavDropdown.Item>
          </NavDropdown>
          {/*MATERIALS DROPDOWN*/}
          <NavDropdown title="Materials" id="basic-nav-dropdown"className='button'>
          <NavDropdown.Item href="/MyMaterials">MyMaterial</NavDropdown.Item>
          <NavDropdown.Item href="/NewMaterial">NewMaterial</NavDropdown.Item>
          </NavDropdown>
          {/*DESIGN DROPDOWN*/}
          <NavDropdown title=" Design" id="basic-nav-dropdown"className='button'>
            <NavDropdown.Item href="/MyDesign">MyDesign</NavDropdown.Item>
            <NavDropdown.Item href="/Announce">Announce new Design</NavDropdown.Item>
            <NavDropdown.Item href="/VoteDesign">Vote Design</NavDropdown.Item>
            <NavDropdown.Item href="/MyVotes">My Votes</NavDropdown.Item>
            <NavDropdown.Item href="/Designs">Designs</NavDropdown.Item>
          </NavDropdown>
          {/*REQUEST DROPDOWN*/}
          <NavDropdown title="Request" id = "basic-nav-dropdown">
            
          </NavDropdown>
          {/*ORDERS DROPDOWN*/}
          <NavDropdown title="Orders" id="basic-nav-dropdown"className='button'>
          <NavDropdown.Item href="/NewOrder">NewOrder</NavDropdown.Item>
          <NavDropdown.Item href="/MyOrder">MyOrder</NavDropdown.Item>
          </NavDropdown>

          <Button className='button'>
          <Link to="BuyToken"className='text-link'>Af2-Saldo</Link>
          </Button>
          
          <Button className ="button">
          <Link to="/Signup" className='text-link'>Signup</Link>
          </Button>

        </div>
        </Navbar>
</div>
    }else{
      maker=<div className='container'>
    <Navbar bg="pri" fixed="top" variant="light">

    <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <Button className='button'>
            <Link to="/">Home</Link>
          </Button>
          <NavDropdown title=" Design" id="basic-nav-dropdown">
            <NavDropdown.Item href="/MyDesign">MyDesign</NavDropdown.Item>
            <NavDropdown.Item href="/Announce">Announce new Design</NavDropdown.Item>
            <NavDropdown.Item href="/VoteDesign">Vote Design</NavDropdown.Item>
            <NavDropdown.Item href="/MyVotes">My Votes</NavDropdown.Item>
            {/*all design */}
          </NavDropdown>
          <NavDropdown title="Orders" id="basic-nav-dropdown">
          {/*<NavDropdown.Item href="/NewOrder">NewOrder</NavDropdown.Item> redirect from design */}
          <NavDropdown.Item href="/MyOrder">MyOrder</NavDropdown.Item>
          </NavDropdown>
          {/* nav dropdown request */}
          <Button className='button'>
          <Link to="/BuyToken">Af2-Saldo</Link>
          </Button>
          <Button className ="button">
          <Link to="/Signup">Signup</Link>
          </Button>
          <Button onClick={this.prova}>Try</Button>
        </div>
        </Navbar>
</div>
    }
  return (
    <div>
    {maker}
      <Outlet />
    </div>
  )
};
}