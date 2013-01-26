var logs = [];
var dgram = require('dgram');



	var client = dgram.createSocket("udp4");
	var message = new Buffer("Simon ") ;
	
for(var i=0; i<3; i++){

	
	client.send(message, 0, message.length, 41234, "127.0.0.1", function(err, bytes) {
		console.log("sent: "+message);
		client.close();

	});
}

		