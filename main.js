var logs = [];
var player_list = {};
var serious_port = 8813;

var DEBUG = true;
var dgram = require("dgram");
 
var server = dgram.createSocket("udp4");

function PlayerListString(players){
	var returnString = "";
	for (var id in players){
		returnString += id + ":"+players[id]+","
	}	
	return returnString;
}

server.on("message", function (msg, rinfo) {

	if (DEBUG == true){
		logs.push((new Date()) + ": origin" + msg
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
	
	//The response to the client that has submitted the packet
	var buf = new Buffer(PlayerListString(player_list));
	
	server.send(buf, 0, buf.length,rinfo.port, rinfo.address, function(err, sent) {
		//the callback for successfully sending
		if(DEBUG==true){
			//console.log("confirmed location: " + player_list[rinfo.address] + ", to: "+rinfo.address);
		}
	});
	
	console.log("location: " + player_list[rinfo.address] + ", for: "+rinfo.address);

  	
});

//receive udp packets from game clients
server.on("listening", function () {
  var address = server.address();
  
  //receive current location of the 
  console.log("server listening " +
      address.address + ":" + address.port);
});

server.bind(serious_port);



//Report logs
var http = require('http');
http.createServer(function (req, res) {
  var logs_list = "";
  
  for (var i =0; i<logs.length; i++){
	  logs_list+= "<li>"+logs[i]+"</li>";
  }
  
  res.writeHead(200, {'Content-Type': 'text/html'});
  
  res.end(PlayerListString(player_list)+
  '<br />Hello, this is the log list.... <ul>'+logs_list+' </ul>');
}).listen(12345);