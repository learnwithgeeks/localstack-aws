const Producer = require('sqs-producer');

// create simple producer
var producer = Producer.create({
    queueUrl: 'http://localhost:4576/queue/local-queue',
    region: 'us-east-1'
  });


// send messages to the queue
producer.send(['msg1', 'msg2'], function(err) {
    if (err) console.log(err);
  });

// get the current size of the queue
producer.queueSize(function (err, size) {
    if (err) console.log(err);
   
    console.log('There are', size, 'messages on the queue.');
  });