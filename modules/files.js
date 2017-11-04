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