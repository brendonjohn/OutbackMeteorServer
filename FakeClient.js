var logs = [];
var dgram = require('dgram');
var client = dgram.createSocket("udp4");
var message = new Buffer("10") ;

client.send(message, 0, message.length, 41234, "127.0.0.1", function(err, bytes) {
	client.on('message', function(msg, rinfo){
		console.log(msg);
	
	});
});