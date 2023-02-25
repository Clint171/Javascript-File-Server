
const express = require('express'),
        fs = require("fs"), 
        path = require("path"),
        bodyParser = require('body-parser');

const app = express();

app.use(express.static(path.join(__dirname,'public')));
app.use(bodyParser.urlencoded({extended: false}));

app.use((req, res, next) => {
    res.render('404', {pageTitle: "Page Not Found", path: ""})
});

app.get('/', function (req, res) {
});

app.listen(3000, function () {
  console.log('Server is running on port 3000')
});

