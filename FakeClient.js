var logs = [];
var dgram = require('dgram');
var message = new Buffer("Simon");

var client = dgram.createSocket("udp4");

	client.send(message, 0, message.length, 41234, "127.0.0.1", function(err, bytes) {
		client.close();
	});
	
	
	
	
