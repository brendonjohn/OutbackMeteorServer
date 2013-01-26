var logs = [];

var dgram = require("dgram");

var server = dgram.createSocket("udp4");

server.on("message", function (msg, rinfo) {

	logs.push(msg);

	console.log("server got: " + msg + " from " +
	rinfo.address + ":" + rinfo.port);
});

//receive udp packets from game clients
server.on("listening", function () {
  var address = server.address();
  
  //Check if address is currently playing
  	//assign id for player if it doesn't yet exist
  
  //receive current location of the 
  console.log("server listening " +
      address.address + ":" + address.port);
});

server.bind(41234);



//Report logs
var http = require('http');
http.createServer(function (req, res) {
  var logs_list = "";
  
  for (int i =0; i<logs.length; i++){
	  logs_list+= "<li>"+logs[i]+"</li>";
  }
  
  res.writeHead(200, {'Content-Type': 'text/html'});
  
  res.end('Hello, this is the log list.... <ul>'+logs_list+' </ul>');
}).listen(process.env.VMC_APP_PORT || 1337, null);