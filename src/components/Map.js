// Import Images
import userLocationMarker from '../img/user.png'
import dotMarker from '../img/dot10.png'

// Import CSS
import '../css/style.css';

// Import Components
import React from 'react';
import MapMarker from "./MapMarker";
import AddRestaurant from "./AddRestaurant";
// Dependencies
import Geocode from "react-geocode";
import { Button, Icon } from "semantic-ui-react";
import {compose, lifecycle, withProps} from "recompose";
import {withScriptjs, withGoogleMap, GoogleMap, Marker, InfoWindow} from "react-google-maps";

// Import Map Styles
const styles = require('../data/GoogleMapStyles.json');

const MapConst = compose(
  withProps({
    googleMapURL: "https://maps.googleapis.com/maps/api/js?key=" + process.env.REACT_APP_G_API + "&v=3.exp&libraries=places,geometry,drawing",
    loadingElement: <div className='loadingElement'/>,
    containerElement: <div className='containerElement'/>,
    mapElement: <div className='mapElement' />
  }),
  lifecycle({
    componentDidMount() {
      const refs = {};

      this.setState({
        onMapMounted: ref => {
          refs.map = ref;
        },
        onDragEnd: () => {
          this.props.handleCenterChange( {
            lat: refs.map.getCenter().lat(),
            lng: refs.map.getCenter().lng()
          });
        },
        onZoomChanged: () => {
          let zoom = refs.map.getZoom();
          this.props.handleZoomChange(zoom);
        }
      })
    },
  }),
  withScriptjs,
  withGoogleMap)((props) =>
  <GoogleMap
    ref={props.onMapMounted}
    onDragEnd={props.onDragEnd}
    onRightClick={e => props.openInfoWindow(e)}
    onZoomChanged={props.onZoomChanged}
    defaultZoom={15}
    center={props.center}
    defaultOptions={{
      disableDefaultUI: true,
      keyboardShortcuts: false,
      scaleControl: true,
      scrollWheel: true,
      draggable: true,
      styles: styles
    }}
  >

    {/* Load user Marker */}
    {props.userMarker &&
      <Marker
        icon={{url: userLocationMarker}}
        position={{lat: props.userLocation.lat, lng: props.userLocation.lng}}
      />
    }

    {/* Center Marker */}
    {props.center && ((props.center.lat !== props.userLocation.lat) && (props.center.lng !== props.userLocation.lng)) &&
      <Marker
        icon={{url: dotMarker}}
        position={{lat: props.center.lat, lng: props.center.lng}}
      />
    }

    {/* Load Restaurant Markers */}
    {props.restaurants.map( (r, id) =>
      <MapMarker
        key={id}
        position={{lat: r.lat, lng: r.long}}
        index={r.id}
        restaurant={r}
        activeRest={props.activeRest}
        handleActiveRest={props.handleActiveRest}
      />)
    }

    {/* Load Add Restaurant InfoWindow on right click */}
    {props.mapState.isRestAddButtonDisplayed &&
      <InfoWindow
        position={{lat: props.mapState.newRestData.lat, lng: props.mapState.newRestData.lng}}
        onCloseClick={props.closeInfoWindow}
      >
        <div>
          <h4>Add restaurant</h4>
          <p>{props.mapState.newRestData.address}</p>
          <AddRestaurant
            restaurants={props.restaurants}
            newRestData={props.mapState.newRestData}
            closeInfoWindow={props.closeInfoWindow}

            handleNewData={props.handleNewData}
          />
        </div>
      </InfoWindow>
    }

  </GoogleMap>
);

export default class Map extends React.PureComponent {
  state = {
    isRestAddButtonDisplayed: false,
    isRestAddModalOpen: false,
    newRestData: {
      address: '',
      lat: '',
      lng: ''
    }
  };

  closeInfoWindow = () => {
    this.setState({
      isRestAddButtonDisplayed: false,
      newRestData: {
        address: '',
        lat: '',
        lng: ''
      }
    })};

  openInfoWindow = (e) => {
    let restData = {};

    Geocode.setApiKey(process.env.REACT_APP_G_API);
    Geocode.fromLatLng(e.latLng.lat(), e.latLng.lng()).then(
      response => {
        const address = response.results[0].formatted_address;
        restData = {
          address: address,
          lat: e.latLng.lat(),
          lng: e.latLng.lng()
        };
        this.setState({
          newRestData: restData,
          isRestAddButtonDisplayed: true
        })
      },
      error => {
        console.error(error);
      }
    )
  };

  render() {
    const { userLocation, restaurants, center, activeRest, handleRestSearch, flags,
            handleActiveRest, handleCenterChange, handleNewData, handleZoomChange } = this.props;
    const { closeInfoWindow, openInfoWindow, state } = this;

    return(
      <div>
        <MapConst
          restaurants={restaurants}
          center={center}
          userLocation={userLocation}
          userMarker={flags.isUserMarkerShown}
          activeRest={activeRest}
          mapState={state}

          closeInfoWindow={closeInfoWindow}
          openInfoWindow={openInfoWindow}

          handleNewData={handleNewData}
          handleZoomChange={handleZoomChange}
          handleActiveRest={handleActiveRest}
          handleCenterChange={handleCenterChange}
        />
        <Button className='toggle-button' toggle active={flags.isRestSearchAllowed} onClick={handleRestSearch}>
          {flags.isRestSearchAllowed &&
          <p><Icon name='check square' />Search as I move the map</p>}
          {!flags.isRestSearchAllowed &&
          <p><Icon name='square outline' />Search as I move the map</p>}
        </Button>

      </div>
    )
  }
}