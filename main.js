var TESTMODE = true;

var player_list = {};
var listener_config = {
	port:8813
};
var test_mode = {
	response: 'localhost',
	port:8814,
	message_count:0
};
var dgram = require("dgram");
var server = dgram.createSocket("udp4");

server.on("message", function (msg, rinfo) {
	var user_id = rinfo.address+":"+rinfo.port;
	
	if (TESTMODE === true){
		console.log("Received: " + msg);
	}
		
	//set the new location
	player_list[user_id] = msg;
	
	//The response to the client that has submitted the packet
	var buf = new Buffer("hey hey hey: "+(test_mode['message_count']++));
	server.send(buf, 0, buf.length,
                  rinfo.port, rinfo.address,
                  function(err, sent) {
                    //Todo:....
                  });
});

//receive udp packets from game clients
server.on("listening", function () {
  var address = server.address();
  
  //receive current location of the 
  console.log("server listening " +
      address.address + ":" + address.port);
});

server.bind(listener_config['port']);