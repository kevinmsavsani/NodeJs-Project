// Set express as Node.js web application 
// server framework. 
// To install express before using it as 
// an application server by using  
// "npm install express" command. 
var express = require('express'); 
var app = express(); 
const cities = require('cities');
const url = require('url');
const http = require('http');
var parser = require('body-parser');
var path = require('path');
var city, query;

app.use(parser.urlencoded({ extended: false }))
app.use(parser.json())
 
app.use(function(req,res,next){
    res.locals.userValue = null;
    next();
})
  
// Set EJS as templating engine 
app.set('view engine','ejs');

app.get('/', (req, res)=>{ 
  query = url.parse(req.url, true).query;
  if (query.zipCode) city = cities.zip_lookup(query.zipCode).city;
  else city = "not found"

// The render method takes the name of the html 
// page to be rendered as input. 
// This page should be in views folder  
// in the root directory. 

    res.render('home',{
        topicHead : 'Student Form',city:city
    });
    console.log('user accessing Home page');
});

app.post('/student/add',function(req,res){
    var student = {
        first : req.body.fname,
        last : req.body.lname
    }
    console.log(student);
    res.render('home',{
        userValue : student,
        topicHead : 'Student Form',
        city:city
    });
    //res.json(student);
     
});

  
var server = app.listen(4000, function(){ 
    console.log('listining to port 4000') 
}); 



