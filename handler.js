// Lambda functions for serverless.yml 

/**
aws-sdk pacakage exists on lambda instances and typically is a global install for dev envs
thus it is not included in my package.json.
**/
const AWS = require('aws-sdk'),
  db = new AWS.DynamoDB,
  headers = { 
    "Access-Control-Allow-Origin" : "*",
    "Access-Control-Allow-Credentials" : true 
  };

module.exports.updateUserClick = (event, context, cb) => {
  //TODO type check those toStrings
  const body = JSON.parse(event.body), 
  dbParams = {
    Item: {
      "latLong": {
        S: body.latLong
      }, 
      "latitude": {
        N: body.latitude.toString()
      },
      "longitude": {
        N: body.longitude.toString()
      },
      "added": {
        S: new Date().toString()
      }
    }, 
    TableName: "mappinTable"
  };
  db.putItem(dbParams, (e,d) => {
     console.log(e, d)
     cb(null, { statusCode: 200, headers, body: JSON.stringify({message: 'updated db'} ) })
  })
}

module.exports.getUserClicks = (event, context, cb) => {

  cb(null, {statusCode: 200, headers })
}