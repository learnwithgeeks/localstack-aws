// consumer.js
const AWS = require('aws-sdk');
const { promisify } = require('util');
// again, specify default Localstack region
AWS.config.update({ region: 'us-east-1' });
// also, the same as with the publisher
const sqs = new AWS.SQS({ endpoint: 'http://localhost:4576' });
// as i said, i like promises
sqs.receiveMessage = promisify(sqs.receiveMessage);
const QueueUrl = "http://localhost:4576/queue/local-queue"; // leave this one blank for now!
const receiveParams = {
  QueueUrl,
  MaxNumberOfMessages: 1
};
async function receive() {
  try {
    const queueData = await sqs.receiveMessage(receiveParams);
  if (
      queueData &&
      queueData.Messages &&
      queueData.Messages.length > 0
    ) {
      const [firstMessage] = queueData.Messages;
      console.log('RECEIVED: ', firstMessage);
      const deleteParams = {
        QueueUrl,
        ReceiptHandle: firstMessage.ReceiptHandle
      };
      sqs.deleteMessage(deleteParams);
    } else {
      console.log('waiting...');
    }
  } catch (e) {
    console.log('ERROR: ', e);
  }
}
// we poll every 500ms and act accordingly
setInterval(receive, 500);