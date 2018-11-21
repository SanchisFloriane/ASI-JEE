'use strict';

const fs = require("fs");
const path = require("path");
const CONFIG = JSON.parse(process.env.CONFIG);

var bodyParser = require('body-parser');
var jsonParser = bodyParser.json();

// create application/x-www-form-urlencoded parser
var urlencodedParser = bodyParser.urlencoded({ extended: false });

var express = require("express");
var router = express.Router();
module.exports = router;

//WS LOADPRES
router.route("/loadPres").get((req, res) => {
    console.log('WS loadPres get');

    let listFile = [];
    const extname = "json";
    let parsedData = {};

    //Get all JSON files in the CONFIG.presentationDirectory
    fs.readdir(CONFIG.presentationDirectory, function (err, data) {

        if (err) {
            res.send("No data");
        }

        data.forEach(fileName => {
            if (!extname || path.extname(fileName) === "." + extname) {
                listFile.push(fileName);
            }
        });

        listFile.forEach(file => {
            // Get content from file
            fs.readFile(CONFIG.presentationDirectory + "/" + file, (err, data) => {

                if (err) {
                    console.log(err.message);
                    res.status(500);
                    res.send("error");
                }

                // Define to JSON type
                let content = JSON.parse(data)
                parsedData[content.id] = content;

                if (file == listFile[listFile.length-1]) {
                    //Return data
                    res.status(200);
                    res.send(parsedData);
                }
            });
        });
    });
});

//WS SAVEPRES
router.route("/savePres").post(urlencodedParser, (req, res) => {
    console.log('WS savePres get');

    var body = '';

    req.on('data', function (data) {
        body += data;
    });

    if (body) return res.sendStatus(400);

    req.on('end', function () {

        req.body = JSON.parse(body);
        fs.writeFile(CONFIG.presentationDirectory + "/" + req.body.id + ".pres.json", body, { flag: 'wx' }, function (err) {
            if (err) throw err;

            res.status(200);
            res.send("JSON added");
        });
    });

});


