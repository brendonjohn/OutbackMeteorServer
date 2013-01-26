var logs = [];
var player_list = {};


var DEBUG = true;
var dgram = require("dgram");
var jQuery = require("jQuery");

var server = dgram.createSocket("udp4");

server.on("message", function (msg, rinfo) {

	if (DEBUG == true){
		logs.push((new Date()) + ": " + msg
		+ ", "+ rinfo.address
		+ ", "+ rinfo.port);	
		console.log("server got: " + msg + " from " + rinfo.address + ":" + rinfo.port);
	
	}
	
	//Check if address is not yet playing
	if (player_list[rinfo.address] == null){
	}
	
	//Todo: interpret the message
	new_location = msg;
		
	//set the new location
	player_list[rinfo.address] = new_location;
  	
});

//receive udp packets from game clients
server.on("listening", function () {
  var address = server.address();
  
  //receive current location of the 
  console.log("server listening " +
      address.address + ":" + address.port);
});

server.bind(41234);



//Report logs
var http = require('http');
http.createServer(function (req, res) {
  var logs_list = "";
  
  for (var i =0; i<logs.length; i++){
	  logs_list+= "<li>"+logs[i]+"</li>";
  }
  
  res.writeHead(200, {'Content-Type': 'text/html'});
  
  res.end('Hello, this is the log list.... <ul>'+logs_list+' </ul>');
}).listen(process.env.VMC_APP_PORT || 1337, null);