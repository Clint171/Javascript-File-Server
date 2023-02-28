const fs = require("fs");
const path = require("path");
var directories = [];
var files = [];
var fullpath = [];

// sync function
var readSync = (currentDirPath) =>{
    fs.readdirSync(currentDirPath).forEach(function (name) {
        var filePath = path.join(currentDirPath, name);
        var stat = fs.statSync(filePath);
        if (stat.isFile()) {
            files.push(filePath);
        } 
        else if (stat.isDirectory()) {
            directories.push(filePath);
        }
    });
    fullpath = directories.concat(files);
    return fullpath;
}
module.exports = readSync;