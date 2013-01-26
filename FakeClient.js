var logs = [];
var dgram = require('dgram');
var client = dgram.createSocket("udp4", function(msg, rinfo){
	console.log("received: " + msg);
	
});

SubmitLocationSequence(5,200);

function SubmitLocationSequence(number, currentLocation){
	var message = new Buffer(currentLocation.toString()) ;
	client.send(message, 0, message.length, 41234, "127.0.0.1", function(err, bytes) {
		//client.on('message', function(msg, rinfo){
		//	console.log(msg);
			if (number>0)
				SubmitLocationSequence(--number, currentLocation-10);
			else{
				client.close();
			}
		//});		
	});
}

