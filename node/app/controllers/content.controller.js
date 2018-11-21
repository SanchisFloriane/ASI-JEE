'use strict';

var ContentModel = require('../models/content.model');
const fs = require("fs");
const path = require("path");
const CONFIG = JSON.parse(process.env.CONFIG);
const utils = require("../utils/utils.js");

// Display list of all ContentModel.
exports.list = (req, res) => {
    console.log("on passe dans le get du controller list");
    let jsonFiles = [];
    const jsonformat = "json";
    const txtformat = "txt";
    let parsedData = {};

    //Get all JSON files in the CONFIG.presentationDirectory
    fs.readdir(CONFIG.contentDirectory, (err, data) => {

        if (err) {
            res.send("No data");
        }

        data.forEach(fileName => {
            if (path.extname(fileName) === "." + jsonformat) {
                jsonFiles.push(fileName);
            }
        });

        jsonFiles.forEach(file => {
            // Get content from file
            fs.readFile(CONFIG.contentDirectory + "/" + file, (err, data) => {

                if (err) {
                    console.log(err.message);
                    res.status(500);
                    res.send("error");
                }

                // Define to JSON type
                let content = JSON.parse(data);
                parsedData[content.id] = content;

                if (file == jsonFiles[jsonFiles.length - 1]) {
                    //Return data
                    res.status(200);
                    res.send(parsedData);
                }
            });
        });
    });
};

// Display contentmodel create form on POST.
exports.create = (req, res) => {

    var body = '';

    req.on('data', function (data) {
        body += data;
    });

    if (body) return res.sendStatus(400);

    req.on('end', function () {

        req.body = JSON.parse(body);

        var type = JSON.parse(JSON.stringify(req.body.type));
        var title = JSON.parse(JSON.stringify(req.body.title));
        var fileName = JSON.parse(JSON.stringify(req.body.file));
        var id = fileName;
        fileName += ".txt";
        var src = JSON.parse(JSON.stringify(req.body.src));
        console.log(type + " " + title + " " + fileName + " " + src + " " + id);

        let content = new ContentModel({type, id, title, src, fileName});

        ContentModel.create(content, (err) =>
        {
            if(err)
            {
                console.log(err.message);
                res.status(500);
                res.send("error");
            }

            res.status(200);
            res.send("Contend added !");
        })
    });
};

// Display contentmodel read form on GET.
exports.read = (req, res) => {

    var id = req.params.id;

    ContentModel.read(id,(err, content) => {

        if (err) {
            console.log(err.message);
            res.status(500);
            res.send("error");
        }

        if(content.type.toString() == "img")
        {
            console.log("TYPE IMG");
            res.sendFile(utils.getDataFilePath(content.fileName.toString()).toString());
        }
        else
        {
            var isJson = req.query.json;

            if(isJson == true)
            {
                console.log("On retourne le json");
                //Return data
                res.status(200);
                res.send(content);
            }
            else
            {
                console.log("Redirection");
                //Return data
                res.status(200);
                res.redirect(content.src);
            }
        }
    });
};
