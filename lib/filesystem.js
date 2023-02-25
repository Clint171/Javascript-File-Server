const fs = require("fs");
const path = require("path");
var directories = [];
var files = [];
var fullpath = [];

// sync function
function readSync(currentDirPath) {
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
    console.log(directories);
    console.log(files);
    fullpath = directories + files;
    console.log(fullpath);
}

readSync("C:\\Users\\Clint\\Documents\\Javascript-File-Server");