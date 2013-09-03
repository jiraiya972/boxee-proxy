var filternet = require('filternet');

var myProxy = filternet.createProxyServer();

// You can rewrite the request as it's being sent to the remote server.
// (just headers)
myProxy.on('interceptRequest', function (requestInfo, callback) {
	console.log(requestInfo);
 if(requestInfo.host.indexOf("boxee.tv")>-1 && requestInfo.path.indexOf("/api/get_recommendations")>-1){
   requestInfo.host = 'localhost';
   requestInfo.port = '9001';
 }
 callback(requestInfo);
});

myProxy.on('error', function (error, locationInfo) {
 console.log(locationInfo);
 console.log(error.stack);
});

require('boxee-server');