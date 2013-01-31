//Variables for initializing
var destination = {
	address:"localhost",
	port: 8813
};
var listener = {
	port:8813
};
var dgram = require('dgram');
var messages = {
	sent:0,
	received:0
};

var client = dgram.createSocket("udp4", function(msg, rinfo){
	console.log("received: " + msg);
});

//For sending test packets to the server
function SubmitLocationSequence(number, currentLocation){
	
	console.log("sending message: "+(++messages['sent']).toString());
	
	var message = new Buffer(currentLocation.toString()) ;
	client.send(message, 0, message.length, destination['port'], destination['address'], function(err, bytes) {
			if (number>0)
				SubmitLocationSequence(--number, currentLocation-0.4);
			else{
				//client.close();
				console.log("Initiating the send has finished");
			}		
	});
}


client.on("listening", function () {
  var address = client.address();
  
  //receive current location of the 
  console.log("client listening for server response \n" +
      address.address + ":" + address.port);
      
      SubmitLocationSequence(100,1000);
});

client.on("message", function(msg, rinfo){
	console.log("client received: "+ msg);
})

client.bind(listener['port']);