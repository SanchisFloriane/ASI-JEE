'use strict';

const fs = require("fs");
const utils = require("../utils/utils.js");
var path = require("path");
const CONFIG = JSON.parse(process.env.CONFIG);

module.exports = class ContentModel {

    constructor({type, id, title, src, fileName} = {}) {
        if(type != null || id != null || title != null || src != null || fileName != null) {
            if (id) {
                this.id = id;
            }
            else {
                this.id = utils.generateUUID();
            }
            this.type = type;
            this.title = title;
            this.src = src;
            this.fileName = fileName;
        }
    }

    getData() {
        return this.data;
    }

    setData(data) {
        this.data = data;
    }

    static create(content, callback) {

        var err = new Error();

        if (content) {
            if (content instanceof ContentModel) {
                if (!content.id) {
                    console.log("Id is null");
                    return callback(err);
                }
                else {
                    if (content.type == "img" && content.fileName) {

                        let data = "";

                        if(content.getData()) {
                            data = content.getData();
                        }
                        console.log(data);
                        fs.writeFile(utils.getDataFilePath(content.fileName.toString()).toString(), data, (err) => {
                            if (err) {
                                console.log("Create : error to write file with id : " + content.id.toString() + " and error : " + err);
                                return callback(err);
                            }
                            else {
                                console.log('The file has been saved!');
                            }
                        });
                    }

                    let metadonne = JSON.stringify(content);
                    fs.writeFile(utils.getMetaFilePath(content.id.toString()).toString(), metadonne, (err) => {
                        if (err) {
                            console.log("Create : error to write file with id : " + content.id.toString() + " and error : " + err);
                            return callback(err);
                        }
                        else {
                            console.log('The metadata has been saved!');
                            callback();
                        }
                    });
                }
            }
            else {
                console.log("Content is not an instance of ContentModel.");
                return callback(err);
            }
        }
        else {
            console.log("Content is null.");
            return callback(err);
        }
    }

    static read(id, callback) {

        if (id) {
            console.log("iddd : " + id.toString());
            utils.readFileIfExists(utils.getMetaFilePath(id.toString()).toString(), (err, content) => {

                if (err) {
                    console.log("Read : file does not exist, error : " + err);
                    return callback(err);
                } else {
                    let c = new ContentModel(JSON.parse(content));
                    c.setData(JSON.parse(content).data);
                    console.log("content : " + JSON.stringify(c));
                    callback(null, c);
                }
            });

        } else {
            var err = new Error();
            console.log("Read : Id is null : " + err);
            return callback(err);
        }
    }

    static update(content, callback) {

        var err = new Error();

        if (content) {
            if (content.id) {

                utils.fileExists(utils.getDataFilePath(content.fileName.toString()).toString(), (err) => {

                    if (err) {
                        console.log("Update : file does not exist");
                        return callback(err);
                    }

                    if (content.type == "img" && content.getData() != null && content.getData().length > 0) {

                        fs.writeFile(utils.getDataFilePath(content.fileName.toString()).toString(), content.getData(), (err) => {
                            if (err) {
                                console.log("Error on update data : " + err);
                                return callback(err);
                            } else {
                                console.log('The file has been updated !');
                            }
                        });
                    }

                    let metadonne = JSON.stringify(content);
                    fs.writeFile(utils.getMetaFilePath(content.id.toString()).toString(), metadonne, (err) => {
                        if (err) {
                            console.log("Error on update metadata : " + err);
                            return callback(err);
                        } else {
                            console.log('The metadata has been updated!');
                            callback(err, content);
                        }
                    });
                });

            } else {
                console.log("Update : id is null");
                return callback(err);
            }
        } else {
            console.log("Update : content is null");
            return callback(err);
        }
    }

    static delete(id, callback) {

        if (id) {
            utils.fileExists(utils.getDataFilePath(id.toString()).toString() + ".txt", (err) => {

                if (err) {
                    console.log("Error on delete : " + err);
                    callback(err);
                }

                fs.unlink(utils.getDataFilePath(id.toString()) + ".txt", (err) => {
                    if (err) {
                        console.log("Error on delete file with id : " + id.toString());
                        callback(err);
                    }
                    else {
                        console.log("File with id : " + id.toString() + " deleted !");
                    }
                });

                utils.fileExists(utils.getMetaFilePath(id.toString()).toString(), (err) => {

                    if (err) {
                        console.log("Error on delete : " + err);
                        callback(err);
                    }

                    fs.unlink(utils.getMetaFilePath(id.toString()), (err) => {
                        if (err) {
                            console.log("Error on delete metadata file with id : " + id.toString());
                            callback(err);
                        }
                        else {
                            console.log("Metadata file with id : " + id.toString() + " deleted !");
                            callback();
                        }
                    });
                });
            });
        }
        else {
            console.log("Id is null");
            callback(new Error());
        }
    }
};