import React from 'react';
import styled from 'styled-components';
import BaseCard from "../../../components/cards/BaseCard"
import PhaseCard from '../../../components/cards/PhaseCard';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Navbar from 'react-bootstrap/Navbar';

class VoteDesign extends React.Component{

    constructor(props) {
        super(props);
        this.data = [
            {
                designIMG: "Qmarb9nryX3rBs8Gg2pmMEU4rmd4p1FCnq3nzRDUhv8sWd",
                nome:"Prova 1 - Card Accettata",
                descrizione:"Descrizione 1",
                status: "Accettato",
                timestamp: "timestampInt",
                phase: 1
            },
            {
                designIMG: "Qmarb9nryX3rBs8Gg2pmMEU4rmd4p1FCnq3nzRDUhv8sWd",
                nome:"Prova 2 - Card in Voting",
                descrizione:"Descrizione 2",
                status: "Voting",
                timestamp: "timestampInt",
                phase: 2
            }
        ];
            
    }

    render(){
        return(
            <>
                <div><h1>Vote a Design</h1></div>
                <nav className="navbar navbar-dark bg-dark shadow mb-5">
                    <div nav className="nav-left">
                        <PhaseDiv>
                            <b>Voting Phase 1</b>
                            {
                                this.data.map((data) => {if(data.phase == 1) return <BaseCard key={data.nome} img={data.designIMG} name={data.nome} description={data.descrizione}/>})
                            }
                        </PhaseDiv>
                        <PhaseDiv>
                            <b>Voting Phase 2</b>
                            {
                                this.data.map((data) => {if(data.phase == 1) return <BaseCard key={data.nome} img={data.designIMG} name={data.nome} description={data.descrizione}/>})
                            }                       
                        </PhaseDiv>
                    </div>
                </nav>
            </>
        )
    }
}

export default VoteDesign;

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