// publisher.js
const AWS = require('aws-sdk');
const { promisify } = require('util');
// LocalStack uses the 'us-east-1' region by default
AWS.config.update({ region: 'us-east-1' });
// the endpoint param is important!
// if it wasn't defined AWS would request the production endpoint
const sns = new AWS.SNS({ endpoint: 'http://localhost:4575' });
// I prefer working w/ promises
// rather than w/ callbacks
// therefore I'm making "sns.publish" return promise
sns.publish = promisify(sns.publish);
const TopicArn = "arn:aws:sns:us-east-1:000000000000:local-topic"; // leave this one blank for now!
async function publish(msg) {
  const publishParams = {
    TopicArn,
    Message: msg
  };
  let topicRes;
  try {
    topicRes = await sns.publish(publishParams);
  } catch (e) {
    topicRes = e;
  }
  console.log('TOPIC Response: ', topicRes);
}
for (let i = 0; i < 5; i++) {
  publish('message #' + i);
}