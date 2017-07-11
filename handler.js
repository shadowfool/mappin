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
  params = {
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
  db.putItem(params, (e,d) => {
     if(e) console.log(e)
     else cb(null, { statusCode: 200, headers, body: JSON.stringify({message: 'Updated DB w/ new entry'} ) })
  })
}

module.exports.getUserClicks = (event, context, cb) => {
  const params = {
    ExpressionAttributeNames: {
      "#LT": "latitude", 
      "#LO": "longitude",
      "#A": "added"
    }, 
    ExpressionAttributeValues: {
      ":m": {
        N: "-90"
     }
    }, 
    FilterExpression: "latitude > :m",
    ProjectionExpression: "#LT, #LO, #A", 
    TableName: "mappinTable"
  };
  db.scan(params, (e, d) => {
    if(e) console.log(e)
    else {
      cb(null, {statusCode: 200, headers, body: JSON.stringify(d) })
    }
  });
}

module.exports.addClickToState = (event, context, cb) => {
  // TODO this is half finished, need to figure out update or create at 1 for updateItem
  // const body = JSON.parse(event.body),
  // params = {
  //    Key: {
  //     stateId: {
  //       N: body.stateId
  //     }
  //   },
  //   AttributeUpdates: {

  //   },
  //   ExpressionAttributeValues: {
  //     ":a": {
  //       N: "1"
  //     }
  //   },
  //   UpdateExpression: "ADD #S :m",
  //   TableName: "statesTables"
  // }
  // db.updateItem(params, (e, d) => {
  //   if(e) console.log(e)
  //   else cb(null, {statusCode: 200, headers, body: JSON.stringify(d) })
  // })
}