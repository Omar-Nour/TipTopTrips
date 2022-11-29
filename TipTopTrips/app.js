var express = require('express');
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
  res.render('registration');
});

app.get('/home', function(req, res) {
  res.render('home');
});

var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/";

MongoClient.connect(url, function(err, client) {
  if (err) throw err;
  var dbo = client.db("UserLogins");
  //dbo.collection("LoginCollection").insertOne({id: 1, username: "admin", password: "admin"});
});

app.post('/', function(req, res) {
  let username = req.body.username;
  let password = req.body.password;
  MongoClient.connect(url, function(err, client) {
    if (err) throw err;
    var dbo = client.db("UserLogins");
    dbo.collection("LoginCollection").insertOne( {id:1, name: 'awer'});
    dbo.collection("LoginCollection").find({username: username, password: password}).toArray(function(err, result) {
      if (err) throw err;
      if (result.length > 0) {
        res.redirect('/home');
        // app.get('/home', function(req, res) {
        //   res.render('home');
        // });
        console.log("Valid login");
      } else {
        res.render('login', {invalidloginerror: "Invalid username or password"});
        // app.get('/login', function(req, res) {
        //   res.render('login');
        // });
        //alert("Invalid login");
        console.log("Invalid login");
      }
  });
  
})});

app.timeout = 60000;
app.listen(3000);
