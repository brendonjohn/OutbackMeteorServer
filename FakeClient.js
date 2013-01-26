var logs = [];
var serious_port = 8813;
var destination = ""
var dgram = require('dgram');

var client = dgram.createSocket("udp4", function(msg, rinfo){
	console.log("received: " + msg);
	
});

SubmitLocationSequence(5,200);

function SubmitLocationSequence(number, currentLocation){
	var message = new Buffer(currentLocation.toString()) ;
	client.send(message, 0, message.length, serious_port, destination, function(err, bytes) {
			if (number>0)
				SubmitLocationSequence(--number, currentLocation-10);
			else{
				client.close();
			}		
	});
}

