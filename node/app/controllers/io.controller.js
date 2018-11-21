'use strict';

var app = require('express')();
const CONFIG = JSON.parse(process.env.CONFIG);
let myMap = new Map();
var ContentModel = require('../models/content.model');

// Listen function
exports.listen = (server) => {

    server.listen(CONFIG.port, function () {
        console.log("Listening on port :" + CONFIG.port);
    });

    const io = require("socket.io")(server);
    
    io.on("connection", function (socket) {
        console.log("a user connected !");

        socket.on("data_comm", function () {
            myMap.set(socket.id, socket);
            console.log("Socket added to the map : " + socket.id);
        });

        socket.on("slidEvent", function (msg) {

            console.log("Event slidEvent received : " + msg);

            let jsonEvent = JSON.parse(msg);
            if (jsonEvent.CMD === ("START" || "END" || "BEGIN" || "PREV" || "NEXT")) {
                console.log("IdSlide : " + jsonEvent.PRES_ID);
            ContentModel.read(jsonEvent.PRES_ID, (err, data) => {
                socket.broadcast.emit('broadcast', data);
                console.log(data);
            });
            }
        });

        socket.on("currentSlidEvent", function () {
            socket.broadcast.emit('currentSlidEvent', '');
        });

        socket.on('broadcast', function(data) {
            console.log("Id socket : " + socket.id + " : with data : " + data);
        });

        socket.on('disconnect', function () {
            console.log('The user is disconnected');
        });

    });
};



