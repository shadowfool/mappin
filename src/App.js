import React, { Component } from 'react';
import './App.css';
import Api from './utils/api.js'

//Esri related wrappers/libs 
import { dojoRequire } from 'esri-loader';
import EsriLoader from 'esri-loader-react';

//This may have been easier for rendering points, but I don't have time to attempt to swap it out and figure out its api
// import esri from 'esri-leaflet'


class App extends Component {
  constructor( props ) {
    super( props );
    this.state = {};
  }

  componentWillMount = () => {
    this.getClicks()
  }

  createMap = () => {
    // Creates a map, event handlers, and adds a feature layer to it
    dojoRequire(['esri/Map', 'esri/views/MapView', "esri/layers/FeatureLayer"], ( Map, MapView, FeatureLayer ) => { 
      let map = new Map( { basemap: 'topo' } ),
      mapRef = new MapView({
        container: this.mapContainer,
        map
      }),
      featureLayer = new FeatureLayer({ 
        url: 'https://sampleserver6.arcgisonline.com/arcgis/rest/services/Census/MapServer/3'
      });
      map.add(featureLayer)
      this.setClickHandlers( mapRef );
    });

  }

  setClickHandlers = ( map ) => {
    map.on( 'click', event => {
      const convertedPoints = map.toMap({y: event.y, x: event.x }),
      { latitude, longitude } = convertedPoints;

      Api.updateUserClick({ latitude, longitude })
      .then( () => {
        this.getClicks()
      })

      map.hitTest(event.screenPoint).then( (response) => {
        let result = response.results[0]
        // This lambda function is not finished
        if(result) Api.addClickToState( result.graphic.attributes.OBJECTID )
      })
    })
  }

  // Ideally this goes by extend of the current map, but it seems like the convience functions around extend
  // do not exist in esri 4.4 (perhaps deprecated from 3.4 -> 4?)
  getClicks = () => {
    Api.getUserClicks()
    .then( ( data = {} ) => {
      let transformedClicks = this.transformClicks( data.Items );
      this.setState( { clicks: transformedClicks } )
    })
  }

  // should transform clicks into something usable with arcgis, just don't know what format that should be yet
  // so for now it just returns the input
  transformClicks = ( clicks = [] ) => {
    return clicks
  }

  render() {
    console.log(this.state)
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
