import React, { Component } from 'react';
import Nav from 'react-bootstrap/Nav';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './Home';
import PlayerDetails from './PlayerDetails';
const navbar= ({ account }) =>{

  return (
  <nav className="navbar navbar-dark bg-dark shadow mb-5">
  <p className="navbar-brand my-auto">Dapp</p>
  <ul className="navbar-nav">
    <li className="nav-item text-white">{account}</li>
    </ul>
    </nav>
  );
}
export default navbar;