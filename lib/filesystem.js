const fs = require("fs");
const path = require("path");
var directories;
var files;
var fullpath;

// sync function
var readSync = (directory,currentDirPath) =>{
    files = [];
    directories = [];
    fullpath = {};
    var check = fs.statSync(path.join(directory,currentDirPath));
    if(!check.isDirectory()){
        return path.join(directory,currentDirPath);
    }
    fs.readdirSync(path.join(directory,currentDirPath)).forEach(function (name) {
        var filePath = path.join(currentDirPath, name);
        var stat = fs.statSync(path.join(directory,filePath));
        if (stat.isFile()) {
            files.push(filePath);
        } 
        else if (stat.isDirectory()) {
            directories.push(filePath);
        }
    });
    fullpath = {
        directories: directories,
        files: files
    }
    return JSON.stringify(fullpath);
}
module.exports = readSync;