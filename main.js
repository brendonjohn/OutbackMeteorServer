var TESTMODE = true;

var player_list = {};
var listener_config = {
	port:8813
};

var io = require("socket.io").listen(listener_config['port']);

//open socket with game clients
io.sockets.on("connection", function (socket) {
  //client has connected
  
  socket.on('userdetails', function (details){
  	//Todo: add player and current location to the player_list
	socket.broadcast.emit("user connected");
	console.log("user connected: "+details);
  });
  
  socket.on('gameplay', function(message, locationUpdate){
  	
  });
  
});
