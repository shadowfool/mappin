// Lambda functions for serverless.yml 

/**
aws-sdk pacakage exists on lambda instances and typically is a global install for dev envs
thus it is not included in my package.json.
**/
const AWS = require('aws-sdk'),
  db = new AWS.DynamoDB;


module.exports.updateUserClick = (event, context, cb) => {
  cb(null, {statusCode: 200})
}

module.exports.getUserClicks = (event, context, cb) => {
  cb(null, {statusCode: 200})
}