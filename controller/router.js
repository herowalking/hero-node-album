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

exports.showUp = function (req, res) {
    var allFolders = file.getAllAlbums(function (allFolders) {
        res.render("up", {
            allAlbums: allFolders
        });
    });
}

exports.doPost = function (req, res) {
    var form = new formidable.IncomingForm();
    form.uploadDir = path.normalize(__dirname + '/../tmpup/');
    form.parse(req, function (err, fields, files, next) {
        if(err) {
            next();
            return;
        }
        var size = parseInt(files.uploadFile.size/1024);
        console.log(files.uploadFile.size);
        console.log(size);
        if(size > 2000) {
            res.send('图片太大,应小于10M');
            fs.unlink(files.uploadFile.path);
            return;
        }
        var newDate = sd.format(new Date(), "YYYYMMDDHHmmss");
        var ran = parseInt((Math.random()*10000).toFixed(0));
        var extname = path.extname(files.uploadFile.name);
        var folder = fields.folderName;
        var oldPath = files.uploadFile.path;
        var newPath = path.normalize(__dirname + '/../uploads/' + folder + "/" + (newDate+ran+extname));
        console.log("当前路径：" + __dirname);
        console.log("旧的路径：" + oldPath);
        console.log("新的路径：" + newPath);
        fs.rename(oldPath, newPath, function (err) {
            if(err) {
                res.send("rename fail");
                return;
            }
            res.send("Success");
        });
    });
}