const fs = require("fs");
const path = require("path");
const fsRead = require("./filesystem.js");
const url = require("url");
var data;

var generate = (_path)=>{
    data = fsRead(path.join("C:\\Users\\Clint",_path));
    var html_string  = ``;
    data.forEach((paths)=>{
        html_string = html_string + `<a href="${path.parse(paths).base}"><button class="item">${path.parse(paths).base}</button></a>`
    });
    return html_string;
}
module.exports = generate;