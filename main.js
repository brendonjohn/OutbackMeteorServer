var TESTMODE = true;

var playerList = {};
var listenerConfig = {
	port:8813
};

var io = require("socket.io").listen(listenerConfig['port']);
var users = 0;

//open socket with game clients
io.sockets.on("connection", function (socket) {
	//client has connected
	var uid = users++;
	
	socket.on('userdetails', function (location){
		socket.broadcast.emit("user connect", uid);
		console.log("user connected: " + uid.toString());
		playerList[uid] = {
			x: location.x,
			y: location.y
		};
	});
	
	socket.on('gameplay', function(locationUpdate){
		playerList[uid].x = locationUpdate.x;
		playerList[uid].y = locationUpdate.y;
	});
	
	socket.on('disconnect', function(){
		socket.broadcast.emit("user disconnect", uid);
		delete playerList[uid];
	});
});
