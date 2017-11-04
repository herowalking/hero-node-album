var file = require('./../modules/files.js');
var formidable = require('formidable');
var path = require('path');
var fs = require('fs');
var util = require('util');
var sd = require('silly-datetime');

exports.showIndex = function (req, res, next) {
    //读取所有文件夹
    var allFolders = file.getAllAlbums(function (allFolders) {
        res.render("index", {
            allAlbums: allFolders
        });
    });
}

exports.showPhoto = function (req, res, next) {
    var albumName = req.params.albumName;
    file.getAllImagesByAlbumName(albumName, function (err, imagesArray) {
        if(err) {
            next();
            return;
        }
        res.render("album", {
            "albumName": albumName,
            "images": imagesArray
        })
    });
}