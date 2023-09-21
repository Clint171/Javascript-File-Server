"use strict"
const express = require('express'),
        //fs = require("fs"), 
        path = require("path"),
        bodyParser = require('body-parser'),
        fsRead = require("./lib/filesystem.js");

const app = express();

app.use(express.static(path.join(__dirname,'public')));
app.use(bodyParser.urlencoded({extended: false}));
//handle internal server errors
app.use(function(err, req, res, next){
    console.error(err.stack);
    res.status(500).send('Internal Server Error');
});

app.get("/", function (req, res) {
  res.sendFile(path.join(__dirname, 'public/file_server.html'));
});

app.get("/:url", function (req, res ) {
    var url = req.params.url;
    //replace dashes with slashes
    url = url.replace(/-/g,"/");
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
    //check if file is a string or a downloaded file
    if(typeof files == "string"){
    res.send(files);
    }
    else{
      console.log('files');
        res.download(files);
    }
})
//Handle 404 errors
app.use((req , res)=>{
  res.status(404).send('404 Not Found');
});

app.listen(3000, function () {
  console.log('Server is running on port 3000')
});

