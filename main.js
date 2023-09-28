"use strict"
const express = require('express'),
        fs = require("fs"), 
        path = require("path"),
        bodyParser = require('body-parser'),
        fsRead = require("./lib/filesystem.js");
const fileUpload = require('express-fileupload');

let fileupload = require("express-fileupload");
const app = express();
const port = process.env.PORT || 3000;
app.use(express.static(path.join(__dirname,'public')));
app.use(bodyParser.urlencoded({extended: false}));
app.use(fileupload());
//handle internal server errors
app.use(function(err, req, res, next){
    console.error(err.stack);
    res.status(500).send('Internal Server Error');
});

app.post("/upload/:url", function (req, res) {
    var url = req.params.url;
    //replace dashes with slashes
    url = url.replace(/-/g,"/");
    var file = req.files.file;
    if(file == null || file == undefined){
        res.send("error");
        return;
    }
    // //convert to array
    // var urlArray = url.split("/");
    // //remove last element
    // urlArray.pop();
    // //convert back to string
    // url = urlArray.join("/");
    //write file
    fs.writeFile(path.join(__dirname,url,file.name), file.data, function(err) {
        if(err) {
            console.log(err);
            res.send("error");
        }
        else{
            res.send("success");
        }
    }); 
});
app.get("/", function (req, res) {
  res.sendFile(path.join(__dirname, 'public/file_server.html'));
});

app.get("/:url", function (req, res ) {
    var url = req.params.url;
    //replace dashes with slashes
    url = url.replace(/-/g,"/");
//Deal with spaces
url = url.replace(" ", "%20");
    if(url == "back"){
        //convert to array
        var urlArray = req.url.split("/");
        //remove last elements
        urlArray.pop();
        urlArray.pop();
        //convert back to string
        url = urlArray.join("/");
      
    }
    var files = fsRead(__dirname,url);
    res.send(files);
});
app.get("/download/:url", function (req, res) {
    var url = req.params.url;
    //replace dashes with slashes
    url = url.replace(/-/g,"/");
        url = url.replace(/\s/g," ");
    //download file
    res.download(path.join(__dirname,url));
});
//Handle 404 errors
app.use((req , res)=>{
  res.status(404).send('404 Not Found');
});

app.listen(port, function () {
  console.log('Server is running on port '+ port);
});

