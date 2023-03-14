"use strict"
const express = require('express'),
        //fs = require("fs"), 
        path = require("path"),
        bodyParser = require('body-parser'),
        ejs = require("ejs"),
        expressLayouts = require('express-ejs-layouts'),
        fsRead = require("./lib/filesystem.js");
        ws = require("ws");
        const wss = new WebSocket.Server({port: });
var currentPath=``;
const app = express();

//Code to identify platform
//var platform = process.platform;

// set the view engine to ejs
app.set('view engine', 'ejs');


app.use(express.static(path.join(__dirname,'public')));
app.use(bodyParser.urlencoded({extended: false}));
//app.use(expressLayouts);

app.all("*", function (req, res) {
  //res.setHeader("Location", req.url);
  console.log(req);
  if( req.path == "/back"){
    var currentPath_arr = currentPath.split("/");
    currentPath_arr.pop();
    currentPath = currentPath_arr.toString();
    currentPath = currentPath.replace(",," , "/");
    currentPath = currentPath.replace("," , "/");
    var paths = generate(path.join(currentPath));

  }
  else if(currentPath == ``){
    currentPath = req.path;
    var paths = fsRead(path.join(req.path));
  }
  else{
    currentPath = currentPath + req.path;
    var paths = fsRead(path.join(currentPath));
  }
  console.log(currentPath);
  res.render("./layouts/main" , {path : path.join(currentPath)});
});


app.listen(3000, function () {
  console.log('Server is running on port 3000')
});

