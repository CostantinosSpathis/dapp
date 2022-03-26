import React from 'react';
import styled from 'styled-components';
import BaseCard from "../../../components/cards/BaseCard"
import PhaseCard from '../../../components/cards/PhaseCard';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Navbar from 'react-bootstrap/Navbar';

class MyVotes extends React.Component{

constructor(props) {
    super(props);
    this.data = [
        {
            designIMG: "Qmarb9nryX3rBs8Gg2pmMEU4rmd4p1FCnq3nzRDUhv8sWd",
            nome:"Prova 1 - Card Valida",
            descrizione:"Descrizione 1 - Card Valida",
            status: "Accettato",
            timestamp: "timestampInt",
            expired: false
        },
        {
            designIMG: "Qmarb9nryX3rBs8Gg2pmMEU4rmd4p1FCnq3nzRDUhv8sWd",
            nome:"Prova 2 - Card Scaduta",
            descrizione:"Descrizione 2 - Card Scaduta",
            status: "Voting",
            timestamp: "timestampInt",
            expired: true
        }
    ];
}

render(){
    return(
        <>
            <div><h1>My Votes</h1></div>
            <nav className="navbar navbar-dark bg-dark shadow mb-5">
                <div nav className="nav-left">
                    <PhaseDiv>
                        <b>Cards Valide</b>
                        {this.data.map((data) => {if(data.expired == false) return <BaseCard key={data.nome} cid="QmRnNdwnpf3fDuVYX92GB3qQKvwC8znc93pkoRswXuzTSg" name={data.nome} description={data.descrizione}/>})}
                    </PhaseDiv>
                    <PhaseDiv>
                        <b>Cards Scadute</b>
                        {this.data.map((data) => {if(data.expired == true) return <BaseCard key={data.nome} cid="QmRnNdwnpf3fDuVYX92GB3qQKvwC8znc93pkoRswXuzTSg" name={data.nome} description={data.descrizione}/>})}   
                    </PhaseDiv>
                </div>
            </nav>
        </>
    )
}
}

export default MyVotes;

const PhaseDiv = styled.div`
background-color: lightgray;
margin: 20px 20px;
width: 900px;
height: 900px;
float: left;
`

const Card = styled.div`
padding: 20px;
background-color: white;
margin: 20px 20px;
width: 95%;
height: 200px;
`