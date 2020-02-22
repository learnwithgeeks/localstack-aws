const { Consumer } = require('sqs-consumer');

const app = Consumer.create({
  queueUrl: 'http://localhost:4576/queue/local-queue',
  handleMessage: async (message) => {
      console.log(message);
    // do some work with `message`
  }
});

app.on('error', (err) => {
  console.error(err.message);
});

app.on('processing_error', (err) => {
  console.error(err.message);
});

app.start();