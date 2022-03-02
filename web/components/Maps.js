import React from 'react';
import * as apiKeys from '../config/APIKEYS.json';

class Maps extends React.Component{

        constructor(props){
            super(props);
            this.state = {
                latitude: null,
                longitude: null,
                userAddress: null,
                img: null
            };
            this.getLocation = this.getLocation.bind(this);
            this.getCoordinates = this.getCoordinates.bind(this);
            this.reverseGeocodeCoordinates = this.reverseGeocodeCoordinates.bind(this);
        }

    getLocation(){
        if(navigator.geolocation){
            navigator.geolocation.getCurrentPosition(this.getCoordinates,this.handleLocationError);
        }else{
             alert("Geolocation not supported on this browser");
        }
    }

    getCoordinates(position){
        console.log(position.coords.latitude);
        this.setState({
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
        })
        this.setState({img: `https://maps.googleapis.com/maps/api/staticmap?center=${this.state.latitude},${this.state.longitude}&zoom=14&size=400x300&sensor=false&markers=color:red%7C${this.state.latitude},${this.state.longitude}&key=${apiKeys["GOOGLE_API_KEY"]}`})
        console.log(this.state.img);
    }

    reverseGeocodeCoordinates(){
        //NON FUNZIONA fetch('https://maps.googleapis.com/maps/api/geocode/json?latlng=${this.state.long}')
    }

    handleLocationError(error){

        switch(error.code){
            case error.PERMISSION_DENIED:
                alert("User denied request for Geolocation")
                break;
            case error.POSITION_UNVAILABLE:
                alert("Location information in unvailable")
                break;
            case error.TIMEOUT:
                alert("The request to get user location timed out")
                break;
            case error.UNKNOWN_ERROR:
                alert("An error occurred")
                break;
            default:
                alert("An unknown error occurred")

        }
    }

    render(){
        return(
            <div className='Login'>
            <h1>Maps</h1>
            <button onClick={this.getLocation}>Get Coordinates</button>
            <p>Latitude : {this.state.latitude}</p>
            <p>Longitude : {this.state.longitude}</p>
            <p>Address: {this.state.userAddress}</p>
            {
                this.state.longitude && this.state.latitude ?
                <img src={this.state.img} alt=''  />
                :
                null
            }
            </div>
        )
    }
}
export default Maps



