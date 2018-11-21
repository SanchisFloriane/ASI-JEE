'use strict';

console.log('It Works !');

//init express js
var express = require("express");
var app = express();
var bodyParser = require('body-parser');
var http = require("http");
var CONFIG = require("./config.json");
//Pour que la config soit accessible dans tous les autres modules
process.env.CONFIG = JSON.stringify(CONFIG);

// init server
var server = http.createServer(app);
server.listen(CONFIG.port);

var defaultRoute = require("./app/routes/default.route.js");
app.use(defaultRoute);

var path = require("path");
app.use("/admin", express.static(path.join(__dirname, "public/admin")));
app.use("/watch", express.static(path.join(__dirname, "public/watch")));

var presentationRoute = require("./presentation/presentation.route");
app.use(presentationRoute);

var controllerRoute = require("./app/routes/content.route");
app.use(controllerRoute);

var IOController = require("./app/controllers/io.controller");
IOController.listen(server);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

var loginRoute = require("./app/routes/login.route");
app.use(loginRoute);