import 'whatwg-fetch'
//TODO make function to handle overlap between api functions pipe specific functions to it and return the res
class Api {
  // eventually I'd want to have seperate dev api's but there's not enough time for that
  // constructor is going to default to my only api url for now. 
  // need that functionf for unified catch.
  constructor( stage ) {
    //More CORS issues than I care to admit
    this._defaultHeaders = {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    };

    //this isn't actually what I want, but will do for now, stage should be used to key into an api config object. 
    this.baseUrl = stage || 'https://v3i9k8clg7.execute-api.us-east-1.amazonaws.com/dev';
  }

  getUserClicks = () => {
    let config = {
      method: 'GET',
      headers: this._defaultHeaders
    };

    return fetch( `${this.baseUrl}/getUserClicks`, config ) 
    .then( res => res.json() )
    .catch( err => console.log( err ) )
  }

  updateUserClick = ( data = {} ) => {
    let { latitude, longitude } = data,
    body = {
      latLong: latitude.toString().concat( longitude.toString() ),
      latitude,
      longitude
    },
    config = {
      method: 'POST',
      headers: this._defaultHeaders,
      body: JSON.stringify(body)
    };
    
    return fetch( `${this.baseUrl}/updateUserClick`, config )
    .then( res => res.json() )
    .catch( err => console.log( err ) )
  }

  addClickToState = ( id = 0 ) => {
    let body = { stateId: id },
    config = {
      method: 'POST',
      headers: this._defaultHeaders,
      body: JSON.stringify(body)
    };

    return fetch( `${this.baseUrl}/addClickToState`, config )
    .then( res => res.json() )
    .catch( err => console.log( err ) )
  } 
}

export default new Api()