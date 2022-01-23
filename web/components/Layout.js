import React from 'react';
import { Outlet, Link } from "react-router-dom";
import Button from 'react-bootstrap/Button';

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
        //</ul>
        </div>
      </nav>

      <Outlet />
    </>
  )
};

export default Layout;