'use strict';

var multer = require("multer");
var express = require("express");
var router = express.Router();
module.exports = router;

var contentController = require('./../controllers/content.controller');

router.route("/contents")
    .get(contentController.list);

router.route("/contents/:id")
    .get(contentController.read);

var multerMiddleware = multer({ "dest": "/tmp/" });

router.post("/contents", multerMiddleware.single("file"), contentController.create);

// Recover the id of the request
router.param("id", function(req, res, next, id) {
    req.id = id;
    next();
});