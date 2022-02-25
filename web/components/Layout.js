import React from 'react';
import { Outlet, Link } from "react-router-dom";
import Button from 'react-bootstrap/Button';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Navbar from 'react-bootstrap/Navbar';

const Layout = ({ account }) => {
  return (
    <>
<div className='container'>
    <Navbar bg="pri" fixed="top" variant="light">

    <div className="collapse navbar-collapse" id="navbarSupportedContent">
        <li className="nav-item text-white">{account}</li>
          <Button className='button'>
            <Link to="/">Home</Link>
          </Button>
          <NavDropdown title="Printers" id="basic-nav-dropdown">
            <NavDropdown.Item href="/AddPrinter">AddPrinters</NavDropdown.Item>
            <NavDropdown.Item href="/MyPrinters">My Printers</NavDropdown.Item>
          </NavDropdown>
          <NavDropdown title=" Design" id="basic-nav-dropdown">
            <NavDropdown.Item href="/MyDesign">MyDesign</NavDropdown.Item>
            <NavDropdown.Item href="/Announce">Announce new Design</NavDropdown.Item>
            <NavDropdown.Item href="/VoteDesign">Vote Design</NavDropdown.Item>
            <NavDropdown.Item href="/MyVotes">My Votes</NavDropdown.Item>
          </NavDropdown>
          <NavDropdown title="Orders" id="basic-nav-dropdown">
          <NavDropdown.Item href="/NewOrder">NewOrder</NavDropdown.Item>
          <NavDropdown.Item href="/MyOrder">MyOrder</NavDropdown.Item>
          </NavDropdown>
          <Button className='button'>
          <Link to="/BuyToken">Af2-Saldo</Link>
          </Button>
          <Button className ="button">
          <Link to="/Signup">Signup</Link>
          </Button>
          <Button className ="button">
          <Link to="/Maps">Maps</Link>
          </Button>
        </div>
        </Navbar>
</div>

      <Outlet />
    </>
  )
};

export default Layout;