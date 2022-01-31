import React from 'react';
import { Outlet, Link } from "react-router-dom";
import Button from 'react-bootstrap/Button';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Navbar from 'react-bootstrap/Navbar';

const Layout = ({ account }) => {
  return (
    <>
      <nav className="navbar navbar-dark bg-dark shadow mb-5">
      <div nav className="nav-left">
        //<ul>
        <li className="nav-item text-white">{account}</li>
          <Button variant="secondary">
            <Link to="/">Home</Link>
          </Button>
          <Button variant ="secondary">
            <Link to="/PlayerDetails">PlayerDetails</Link>
          </Button>
          <Button variant="secondary">
            <Link to="/AddPrinter">AddPrinter</Link>
          </Button>
          <Button variant ="secondary">
          <Link to="/Signup">Signup</Link>
          </Button>
          <Button variant="secondary">
            <Link to="/Signin">Login</Link>
          </Button>
          <NavDropdown title="My designs" id ="basic-nav-dropdown">
            <NavDropdown.Item href="/UploadDesign">Upload a design</NavDropdown.Item>
            <NavDropdown.Item href="/CalculateRes">Calculate Result</NavDropdown.Item>
          </NavDropdown>
          <NavDropdown title="Designs" id ="basic-nav-dropdown">
            <NavDropdown.Item href="/ListDesign">List available design to vote</NavDropdown.Item>
            <NavDropdown.Item href="/VoteDesign">Vote registered design</NavDropdown.Item>
          </NavDropdown>
        //</ul>
        </div>
      </nav>

      <Outlet />
    </>
  )
};

export default Layout;