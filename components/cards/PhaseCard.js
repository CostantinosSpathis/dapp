import React, { Components } from 'react';
import BaseCard from './BaseCard';
import Button from 'react-native-web';

class PhaseCard extends BaseCard {

    constructor(props) {
        super(props);
        this.state = {phase: props.phase, timestamp: Number(props.timestamp), expired: false};
        this.timer = setInterval(() => this.checkTimestamp(), 1000);
    }

    checkTimestamp() {
        console.log('Il timer sta funzionando');
        if(this.checkTimestampCondition()) {
            this.setState({expired: true});
            clearInterval(this.timer);
        }
        console.log((Date.now() - this.state.timestamp));
    }

    checkTimestampCondition() {
        return((Date.now() - this.state.timestamp) >= 0);
    }

    render(){
        return(
            <>
                <BaseCard img={this.props.img} name={this.props.name} description={this.props.description}/>
                <p>{this.state.phase}</p>
                <p>{this.state.timestamp}</p>
                {this.state.expired ? '' : <input type='button' name='TestButton'/>}
            </>
        )
    }
}

export default PhaseCard;