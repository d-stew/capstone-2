let debug = require('debug')('sockettest:server');
let http = require('http');
let port = '3000';
let app = require('./app');
let Twitter = require('twitter');
let config = require('./_config');


let server = app.listen(3000, function () {
  console.log('Listening on port 3000...');
});

let io = require('socket.io').listen(server);

let client = new Twitter({
  consumer_key: config.consumer_key,
  consumer_secret: config.consumer_secret,
  access_token_key: config.access_token_key,
  access_token_secret: config.access_token_secret
});

let hashtags = '#brexit, #rio2016, #hillary, #trump, #DNC, #EU';

client.stream('statuses/filter', {track: hashtags}, function(stream) {
  stream.on('data', function(tweet) {
    io.emit('newTweet', tweet);
  });
  stream.on('error', function(error) {
    throw error;
  });
});

io.on('connection', function(socket){
  console.log('a user connected');
  socket.on('disconnect', function(){
    console.log('user disconnected');
  });
});
