var http = require('http'),
httpProxy = require('http-proxy'),
app;

//
// Create a new instance of HttProxy to use in your server
//
var proxy = new httpProxy.createServer(
  function (req, res, proxy) {
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

proxy.listen(8128);

//require('boxee-server');