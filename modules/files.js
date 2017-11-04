var fs = require('fs');

exports.getAllAlbums = function (callback) {
    fs.readdir("./uploads", function (err, files) {
        if(err) {
            throw err;
            return;
        }
        var allAlbums = [];
        (function iterator(i) {
            if( i == files.length) {
                callback(allAlbums);
                return;
            }
            fs.stat("./uploads/" + files[i], function (err, stats) {
                if(err) {
                    throw err;
                }
                if(stats.isDirectory()) {
                    allAlbums.push(files[i]);
                }
                iterator(i + 1);
            });
        })(0);
    });
}

exports.getAllImagesByAlbumName = function (albumName, callback) {
    fs.readdir('./uploads/' + albumName, function (err, files) {
        if(err) {
            callback("Not find uploads files", null);
            return;
        }

        allImages = [];
        (function iteratror(i) {
            if(i == files.length) {
                callback(null, allImages);
                return;
            }
            fs.stat("./uploads/" + albumName + "/" + files[i], function (err, stats) {
                if(err) {
                    callback("Can not find: " + files[i], null);
                    return;
                }
                if(stats.isFile()) {
                    allImages.push(files[i]);
                }
                iteratror(i + 1);
            });
        })(0);
    });
}