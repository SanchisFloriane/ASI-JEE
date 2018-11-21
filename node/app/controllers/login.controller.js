'use strict';

var ContentModel = require('../models/content.model');
const fs = require("fs");
const path = require("path");
const CONFIG = JSON.parse(process.env.CONFIG);
const utils = require("../utils/utils.js");
const request = require('request');


// Receive data from front and send to JEE
exports.login = (req, res) => {
    var entete = {
        method: 'POST',
        url: 'http://127.0.0.1:8080/FrontAuthWatcherWebService/rest/WatcherAuth/',
        headers: { 'Content-type': 'application/json' },
        json : req.body
    };
    console.log('body:' + req.body);
    request(entete, callback);


    function callback(err, httpResponse, body) {
        if (err) {
            console.error('Erreur envoi login to JEE', err);
            res.status(400);
            res.send('Erreur envoi');
        }
        console.log("httpResponse : " + httpResponse);
        console.log('Envoie réussi ! Server responded with :', body);
        res.status(200);
        res.send(body);
    }
};
