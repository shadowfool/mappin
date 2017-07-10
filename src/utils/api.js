import 'whatwg-fetch'

class Api {
  // eventually I'd want to have seperate dev api's but there's not enough time for that
  // constructor is going to default to my only api url for now. 
  constructor( stage ) {
    this._defaultHeaders = {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'Access-Control-Allow-Methods': '*',
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Headers': '*'
    };

    //this isn't actually what I want, but will do for now, stage should be used to key into an api config object. 
    this.baseUrl = stage || 'https://api.hottake.me';
  }

  getUserClicks = () => {
    let config = {
      method: 'GET',
      headers: this._defaultHeaders
    };

    fetch( `${this.baseUrl}/getUserClicks`, config ) 
    .then( res => res.json() )
    .catch( err => console.log( err ) )
  }

  updateUserClick = ( data = {} ) => {
    let config = {
      method: 'POST',
      headers: this._defaultHeaders
    };
    
    fetch( `${this.baseUrl}/updateUserClick`, config )
    .then( res => res.json() )
    .catch( err => console.log( err ) )
  }

}

export default new Api()