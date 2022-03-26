import React, { useState } from 'react';
import { Outlet } from "react-router-dom";
import styled from 'styled-components';
import UploadSTL from './UploadSTL';
import StlRenderer from './StlRenderer';
import { create } from 'ipfs-http-client';

const Layout = ({ account }) => {

  const ipfs = create('/ip4/127.0.0.1/tcp/5001');  
  const [selectedFile, onChangeFile] = useState('undefined');
  const [volume, onChangeVolume] = useState('undefined');

  return (
    <>
      <nav className="navbar navbar-dark bg-dark shadow mb-5">
        <div nav className="nav-left">
          <ul>
            {/*<TopDiv>
              <div className="nav-item text-black">Account ID: {account}</div>
              <ButtonTop><Link to="/">Home</Link></ButtonTop>
              <ButtonTop><Link to="/PlayerDetails">PlayerDetails</Link></ButtonTop>
              <ButtonTop><Link to="/AddPrinter">AddPrinter</Link></ButtonTop>
              <ButtonTop><Link to="/Signup">Signup</Link></ButtonTop>
              <ButtonTop><Link to="/Signin">Login</Link></ButtonTop>
          </TopDiv>*/}
            <UploadSTL changeFile={(val) => {onChangeFile(val)}}/>
            <LeftDiv>
              <StlRenderer file={selectedFile}/>
            </LeftDiv>
          </ul>
        </div>
      </nav>
      <Outlet />
    </>
  )
};

export default Layout;

const ButtonTop = styled.button`
  background-color: white;
  font-size: 20px;
  padding: 10px 50px;
  border-radius: 10px;
  border-width: 5px;
  border-color: blue;
  margin: 13px;
`;

const LeftDiv = styled.div`
  background-color: lightgray;
  margin: 10px 5px;
  width: 40%;
  height: auto !important;
  float: left;
`;

const TopDiv = styled.div`
  background-color: lightgray;
  margin: 10px 5px;
  padding: 10px 50px;
  float: center;
`;