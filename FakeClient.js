var dgram = require('dgram');
var message = new Buffer("Simon");

var client = dgram.createSocket("udp4");

	client.send(message, 0, message.length, 41234, "outbackmeteor.hp.af.cm", function(err, bytes) {
		client.close();
	});
	
	
	
	
	
	
//Report logs
var http = require('http');
http.createServer(function (req, res) {
  res.writeHead(200, {'Content-Type': 'text/html'});
  res.end('Hello from <a href="http://appfog.com">AppFog.com</a>');
}).listen(process.env.VMC_APP_PORT || 1337, null);