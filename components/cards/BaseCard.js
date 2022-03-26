import React from 'react';
import { create, CID } from "ipfs-http-client";

class BaseCard extends React.Component{

    constructor(props) {
        super(props);
        this.ipfs = create({ host: '127.0.0.1', port: '5001', protocol: 'http', apiPath: '' });
        this.state = {name: props.name, description: props.description};
  
    }

    render(){
        return(
            <>
                <img src={`https://ipfs.io/ipfs/${this.props.cid}`}/>
                <p>{this.state.name}</p>
                <p>{this.state.description}</p>
            </>
        )
    }
}

export default BaseCard;