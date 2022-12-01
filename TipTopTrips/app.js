var express = require('express');
const bcrypt = require("bcrypt")
var path = require('path');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', function(req, res) {
  res.render('login', {invalidloginerror: ""});
});

app.get('/registration', function(req, res) {
  res.render('registration',{invalidloginerror: ""});
});

app.post('/registration', function(req, res) {
  let usern = req.body.username;
  let passw = req.body.password;
  if (usern == "" || passw == "") {
      res.render('registration', {invalidloginerror: "please input a username and a password"});
      console.log("Invalid regsitration");
  } else {
    MongoClient.connect(url, function(err, client) {
      if (err) throw err;
      var dbo = client.db("TipTopTrips");
      dbo.collection("Accounts").find({username: usern}).toArray(function(err, result) {
        if (err) throw err;
        if (result.length > 0) { // username is already taken
          res.render('registration', {invalidloginerror: "username already taken"});
          console.log("Invalid regsitration");
        } else { // new username; proceed to register
          bcrypt.hash(passw, 10, function(err, hash) { // hash password
            dbo.collection("Accounts").insertOne({username: usern, password: hash})
          });
          res.redirect(201, '/');
    }});
  })
}});

app.get('/home', function(req, res) {
  res.render('home');
});

var MongoClient = require('mongodb').MongoClient;
var url = "mongodb+srv://networks:hackstack@netwroksdb.oeyeef4.mongodb.net/test";

app.post('/', function(req, res) {
  let username = req.body.username;
  let password = req.body.password;
  if (username == "" || password == "") {
    res.render('login', {invalidloginerror: "Please input a username and a password"});
    console.log("Invalid login");
  } else {
    MongoClient.connect(url, function(err, client) {
      if (err) throw err;
      var dbo = client.db("TipTopTrips");
      dbo.collection("Accounts").findOne({username: username}, function(err, result) {
        if (err || result == undefined) { // name not found
          res.render('login', {invalidloginerror: "Invalid username or password"});
          console.log("Invalid login");
        } else {
        bcrypt.compare(password, result.password, function(err, result) { // compare stored hash and hashed input 
          if (!result) { // no match for password hash
            res.render('login', {invalidloginerror: "Invalid username or password"});
            console.log("Invalid login");
          } else {
            res.redirect('/home');
            console.log("Valid login");
            // TODO authenticate
          }
        });}
    });
  });
}});

app.timeout = 60000;
app.listen(3000);
