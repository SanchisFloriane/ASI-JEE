'use strict';

var express = require("express");
var router = express.Router();
module.exports = router;


router.route("/")
    .get(function(req, res){
        console.log("racine default");
        res.send("racine default");
    })
    .post(function(request, response){})
    .put(function(request, response){})
    .delete(function(request, response){})
    .all(function(request, response){});