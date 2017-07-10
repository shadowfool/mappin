import React, { Component } from 'react';
import './App.css';
import Api from './utils/api.js'

//Esri related wrappers/libs 
import EsriLoader from 'esri-loader-react';
import { dojoRequire } from 'esri-loader';


class App extends Component {
  constructor( props ) {
    super( props );
    this.state = {};
  }

  componentWillMount = () => {
    this.getClicks()
  }

  createMap = () => {
    dojoRequire(['esri/Map', 'esri/views/MapView'], ( Map, MapView ) => { 
      let mapRef = new MapView({
        container: this.mapContainer,
        map: new Map( { basemap: 'topo' } )
      })
      this.setClickHandlers( mapRef );
    });
  }

  setClickHandlers = ( map ) => {
    map.on( 'click', ( event ) => {
      const convertedPoints = map.toMap({y: event.y, x: event.x }),
      { latitude, longitude } = convertedPoints;
      Api.updateUserClick({ latitude, longitude })
    })
  }

  getClicks = () => {
    Api.getUserClicks()
    .then()
  }

  render() {
    const options = {
      url: 'https://js.arcgis.com/4.4/'
    };
    return (
      <div className="App">
         <EsriLoader options={ options } ready={ this.createMap } />
         <div ref={ node => this.mapContainer = node } className='map-view'></div>
      </div>
    );
  }
}

export default App;
