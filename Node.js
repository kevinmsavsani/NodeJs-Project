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
  
// Set EJS as templating engine 
app.set('view engine', 'ejs'); 

app.get('/', (req, res)=>{ 
  var city, query;
  query = url.parse(req.url, true).query;
  if (query.zipCode) city = cities.zip_lookup(query.zipCode).city;
  else city = "not found"

// The render method takes the name of the html 
// page to be rendered as input. 
// This page should be in views folder  
// in the root directory. 
  
res.render('home', {city:city}); 
}); 
  
var server = app.listen(4000, function(){ 
    console.log('listining to port 4000') 
}); 


