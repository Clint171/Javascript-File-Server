"use strict"
const express = require('express'),
        fs = require("fs"), 
        path = require("path"),
        bodyParser = require('body-parser'),
        fsRead = require("./lib/filesystem.js");

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
    url = url.replace(/\s/, "_");
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


//Supposed to create a directory from client side
app.post("/create/:url", function (req, res) {
    var url = req.params.url;
    //replace dashes with slashes
    url = url.replace(/-/g,"/");
    url = url.replace(/\s/g,"_");
    fs.mkdir(path.join(__dirname,url), function(err) {
        if(err) {
            console.log(err);
            res.send("error");
        }
        else{
            res.send("success");
        }
    }); 
}
);

//Supposed to delete a file from client side
app.post("/delete/:url", function (req, res) {
    var url = req.params.url;
    //replace dashes with slashes
    url = url.replace(/-/g,"/");
    url = url.replace(/\s/g,"_");
    fs.unlink(path.join(__dirname,url), function(err) {
        if(err) {
            console.log(err);
            res.send("error");
        }
        else{
            res.send("success");
        }
    });
});

//Supposed to delete a directory from client side
app.post("/deleteDirectory/:url", function (req, res) {
    var url = req.params.url;
    //replace dashes with slashes
    url = url.replace(/-/g,"/");
    url = url.replace(/\s/g,"_");
    fs.rmdir(path.join(__dirname,url), function(err) {
        if(err) {
            console.log(err);
            res.send("error");
        }
        else{
            res.send("success");
        }
    });
});

//Supposed to rename a file from client side
app.post("/rename/:url", function (req, res) {
    var url = req.params.url;
    //replace dashes with slashes
    url = url.replace(/-/g,"/");
    url = url.replace(/\s/g,"_");
    var name = req.body.name.split("-");
    var newName = req.body.newName;
    console.log(path.join(__dirname,url,name[name.length-1]));
    console.log(path.join(__dirname,url,newName));
    fs.rename(path.join(__dirname,url,name[name.length-1]), path.join(__dirname,url,newName), function(err) {
        if(err) {
            console.log(err);
            res.send("error");
        }
        else{
            res.send("success");
        }
    });
});

//Supposed to rename a directory from client side
app.post("/renameDirectory/:url", function (req, res) {
    var url = req.params.url;
    //replace dashes with slashes
    url = url.replace(/-/g,"/");
    url = url.replace(/\s/g,"_");
    var name = req.body.name;
    fs.rename(path.join(__dirname,url), path.join(__dirname,name), function(err) {
        if(err) {
            console.log(err);
            res.send("error");
        }
        else{
            res.send("success");
        }
    });
});

//Supposed to move a file from client side
app.post("/move/:url", function (req, res) {
    var url = req.params.url;
    //replace dashes with slashes
    url = url.replace(/-/g,"/");
    url = url.replace(/\s/g,"_");
    var name = req.body.name;
    fs.rename(path.join(__dirname,url), path.join(__dirname,name), function(err) {
        if(err) {
            console.log(err);
            res.send("error");
        }
        else{
            res.send("success");
        }
    });
});

//Supposed to move a directory from client side
app.post("/moveDirectory/:url", function (req, res) {
    var url = req.params.url;
    //replace dashes with slashes
    url = url.replace(/-/g,"/");
    url = url.replace(/\s/g,"_");
    var name = req.body.name;
    fs.rename(path.join(__dirname,url), path.join(__dirname,name), function(err) {
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
        url = url.replace(/\s/g,"_");
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

