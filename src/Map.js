import React, {Component} from 'react';
import {Map, GoogleApiWrapper} from 'google-maps-react';

const mapStyles = {
  width: '100%',
  height: '100%'
};

export class MapContainer extends Component {
  render() {
    return (
        <Map
            google={this.props.google}
            zoom={14}
            style={mapStyles}
            initialCenter={{
              lat: 51.514127,
              lng: -0.081938
            }}
        />
    );
  }
}

export default GoogleApiWrapper({
  apiKey: 'AIzaSyBtAOP_BJXr8V9i_QzyB1rcPn0phvuq-OA'
})(MapContainer);