import React, { Component } from 'react';
import './App.css';
import Api from './utils/api.js'

//Esri related wrappers/libs 
import { dojoRequire } from 'esri-loader';
import EsriLoader from 'esri-loader-react';


class App extends Component {
  constructor( props ) {
    super( props );
    this.state = {};
  }

  componentWillMount = () => {
    this.getClicks()
  }

  createMap = () => {
    dojoRequire(['esri/Map', 'esri/views/MapView', "esri/layers/FeatureLayer"], ( Map, MapView, FeatureLayer ) => { 
      let map = new Map( { basemap: 'topo' } ),
      mapRef = new MapView({
        container: this.mapContainer,
        map
      }),
      featureLayer = new FeatureLayer({ url: 'https://sampleserver6.arcgisonline.com/arcgis/rest/services/Census/MapServer/3'});
      map.add(featureLayer)
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
