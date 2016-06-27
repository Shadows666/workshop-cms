var http = require('http');
var fs = require('fs');

function handler(request, response) {
  var endpoint = request.url;
  console.log(endpoint);

  if (endpoint === "/") {
    response.writeHead(200, {
      "Content-Type": "text/html"
    });

    fs.readFile(__dirname + '/public/index.html', function(error, file) {
      if (error) {
        console.log(error);
        return;
      }
      response.end(file);
    });
  } else {
    var splitEndpoint = endpoint.split(".");
    if (splitEndpoint[splitEndpoint.length-1] == 'css') {
      type = 'text/css'
    } else if (splitEndpoint[splitEndpoint.length-1] === 'jpg') {
      type = 'image/jpg'
    }
      response.writeHead(200, {
        "Content-Type": type
      });
    fs.readFile(__dirname + '/public' + endpoint, function(error, file) {
      if (error) {
        console.log(error);
        return;
      }
      response.end(file);
    });
  }
}

var server = http.createServer(handler);

server.listen(3000, function() {
  console.log("Server is listening on port 3000.  Ready to accept requests!");
});
