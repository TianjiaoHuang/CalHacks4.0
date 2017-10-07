var express = require('express'),
    app = express(),
    path = require('path'),
    server = require('http').Server(app),
    port = 3000,
    bodyParser = require('body-parser');
require('dotenv-safe').load();
port = port || process.env.PORT;
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
var routes = require('./api/routes/routes.js');
routes(app);
app.use(express.static(__dirname + '/public'));
server.listen(port);

console.log("working on " + port);


