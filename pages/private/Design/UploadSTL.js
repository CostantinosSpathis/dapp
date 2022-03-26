import React, { Component } from 'react';
import styled from 'styled-components';
import { create } from "ipfs-http-client";

class UploadSTL extends Component{

  constructor({changeFile}){
    super();
    this.state = {file : undefined, photo: undefined, Taur: undefined, Taup: undefined, Component: undefined};
    this.changeFile = changeFile;
    this.ipfs = create({ host: '127.0.0.1', port: '5001', protocol: 'http', apiPath: '' });
  } 
  
	onChange(event) {
    if(event.target.files[0] === undefined) return;
    let reader = new FileReader();
    reader.readAsArrayBuffer(event.target.files[0]);
    reader.onload = () => {
      this.setState({file : reader.result});
    }
    let reader2 = new FileReader();
    reader2.readAsDataURL(event.target.files[0]);
    reader2.onload = () => {
      this.changeFile(reader2.result);
    }
  }

  getFrame() {
    if(!this.state.file) {
      alert('Carica un STL prima di fare una foto!');
      return;
    }
    let canvas = document.getElementsByTagName("canvas")[0];
    this.setState({photo: canvas.toDataURL()});
  }

  async submitForm(event) {
    if(!this.state.photo || !this.state.file) {
      alert('Carica un STL e fai una foto prima di Annunciare!');
      return;
    }
    let file = await this.ipfs.add(this.state.file);
    let photo = await this.ipfs.add(this.state.photo);
    if(file && file.path && photo && photo.path) {
      alert('Operazione completata!');
      console.log(this.state);
    }
  }

	render() {
		return(
      <UploadDiv>
				<InputDiv><input type="file" name="inputSTL" onChange={(event) => this.onChange(event)}/></InputDiv>
				<InputText placeholder="Component" onChange={(event) => this.setState({ Component: event.target.value})}/>
				<InputText placeholder="Taur" onChange={(event) => this.setState({ Taur: event.target.value})}/>
				<InputText placeholder="Taup" onChange={(event) => this.setState({ Taup: event.target.value})}/>
				<InputButton onClick={(event) => this.submitForm(event)}>Announce Design</InputButton>
        <InputButton onClick={(event) => this.getFrame(event)}>Take a snap!</InputButton>
        <img src={this.state.photo}/>
			</UploadDiv>
		)
	}
}

export default UploadSTL;

const InputDiv = styled.div`
  background-color: white;
  font-size: 20px;
  padding: 20px;
  border-radius: 10px;
  border-width: 5px;
  border-color: blue;
  margin: 10px 10px;
  width: 95%;
  float: center;
`;

const InputButton = styled.button`
  background-color: white;
  font-size: 20px;
  padding: 20px;
  border-radius: 10px;
  border-width: 5px;
  border-color: blue;
  margin: 10px 10px;
  width: 95%;
  float: center;
`;

const InputText = styled.input`
  background-color: white;
  font-size: 15px;
  border-width: 5px;
  border-color: blue;
  margin: 10px 10px;
  width: 95%;
`;

const UploadDiv = styled.div`
  background-color: lightgray;
  margin: 10px 5px;
  width: 500px;
  height: auto !important;
  float: right;
`;