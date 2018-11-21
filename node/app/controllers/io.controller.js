'use strict';

var app = require('express')();
var io = require('socket.io');
const CONFIG = JSON.parse(process.env.CONFIG);
var myMap = new Map();

// Listen function
exports.listen = (server) => {

    server.listen(CONFIG.port, function () {
        console.log("Listening on port :" + CONFIG.port);
    });
};

exports.connection = (server) => {

    var io = require("socket.io")(server);
    
    io.on("connection", function (socket) {
        console.log("a user connected !");

        io.emit("data_comm", {for: "everyone"});
        console.log("emit data_comm event");

        socket.on("data_comm", function () {
            myMap.set(socket.id, socket);
            console.log("socket added to the map : " + socket.id);
        });

        socket.on("slidEvent", function (msg) {
            console.log("slidEvent received : " + msg);
            io.emit("currentSlidEvent", null);

            if (msg.CMD == "START") {
                // TO_DO
            } else if (msg.CMD == "PAUSE") {
                // TO_DO
            } else if (msg.CMD == "END") {
                // TO_DO
            } else if (msg.CMD == "BEGIN") {
                // TO_DO
            } else if (msg.CMD == "PREV") {
                // TO_DO
            } else if (msg.CMD == "NEXT") {

            }
        });
    });
};



