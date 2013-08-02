var http = require('http'),
	express = require('express'),
    httpProxy = require('http-proxy'),
	app;
var options = {
  hostnameOnly: true,
  router: {
    'boxee.tv': 'localhost:9001'
  },changeOrigin: false
};

//
// Create a new instance of HttProxy to use in your server
//
var proxy = new httpProxy.createServer(
function (req, res, proxy) {
	//
  // Put your custom server logic here
  //
  //console.log(JSON.stringify(req.headers, true, 2));
  if(req.headers.host.indexOf("boxee.tv")>-1){
  	proxy.proxyRequest(req, res, {
      host: 'localhost',
      port: 9001
  	});
  } else {
    proxy.proxyRequest(req, res, {
      host: req.headers.host,
      port: 80
    });
  }
  }
);

proxy.proxy.on('proxyError', function (err) {
  console.log("The request was error.",err);
});

proxy.on('upgrade', function (req, socket, head) {
  //
  // Proxy websocket requests too
  //
  proxy.proxyWebSocketRequest(req, socket, head);
});


proxy.listen(9000);
/*
//
// Create a regular http server and proxy its handler
//
httpProxy.createServer(function (req, res) {
  //
  // Put your custom server logic here, then proxy
  //
  proxy.proxyRequest(req, res, {
    host: 'localhost',
    port: 9000
  });
}).listen(8001);*/



http.createServer(function (req, res) {
  //res.writeHead(200, { 'Content-Type': 'text/plain' });
  //res.write('request successfully proxied: ' + req.url +'\n' + JSON.stringify(req.headers, true, 2));
  //res.end();
  
  res.writeHead(200, { 'Content-Type': 'application/xml' });
  res.write('<?xml version="1.0" encoding="UTF-8" ?><object type="user" id="jiraiya972"><name>jiraiya972</name><short_name>jiraiya972</short_name><thumb>http://s3.boxee.tv/thumb/200x200/default.png</thumb><thumb_small>http://s3.boxee.tv/thumb/78x78/default.png</thumb_small><user_id>jiraiya972</user_id><user_display_name>jiraiya972</user_display_name><user_first_name></user_first_name><user_last_name></user_last_name><country>FR</country><show_movie_library>1</show_movie_library></object>');
  res.end();
}).listen(9002);

require('boxee-server');