// import files and packages up here
var express = require('express')
var app = express();
var logger = require('morgan')
var data = require('./data');
var fs = require('fs');
var accessLogStream = fs.createWriteStream('./access.log', {flags: 'a'});
// create your express server below
var app;
    app.get('/', function (req, res){  
    res.send("top spots page");
         console.log(req.url, res.statusCode)
});
    app.get('/data', function (req, res){
    res.send(data);   
         console.log(req.url, res.statusCode)
});



// add your routes and middleware below
app.use(logger("combined",{format:"[:date[clf]] :method :url :status :response-time ms",stream: {
    write: function(str)
    {
        accessLogStream.write(str);
        console.log(str);
    }
}}));

var server = app.listen(8080)
// finally export the express application
module.exports = app;
