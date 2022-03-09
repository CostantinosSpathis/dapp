import React, { Component } from 'react'
import { Outlet, Link } from "react-router-dom";
import Button from 'react-bootstrap/Button';

export class ModifyMat extends Component {
  render() {
    return (
      <div>
          ModifyMat
          <Button className ="button">
          <Link to="/Myprinters">Torna indietro senza salvare</Link>
          </Button>
      </div>
    )
  }
}

export default ModifyMat