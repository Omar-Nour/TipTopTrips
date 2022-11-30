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
var url = "mongodb+srv://networks:hackstack@netwroksdb.oeyeef4.mongodb.net/test";

app.post('/', function(req, res) {
  let username = req.body.username;
  let password = req.body.password;
  MongoClient.connect(url, function(err, client) {
    if (err) throw err;
    var dbo = client.db("TipTopTrips");
    dbo.collection("Accounts").find({username: username, password: password}).toArray(function(err, result) {
      if (err) throw err;
      if (result.length > 0) {
        res.redirect('home');
        console.log("Valid login");
      } else {
        res.render('login', {invalidloginerror: "Invalid username or password"});
        console.log("Invalid login");
      }
  });
})});

//Shamekh's code (seperating my code using comments to alleviate pull request merging shenanigans)

//ability to navigate to the Want-To-Go-List page
app.get('/wanttogo', function(req, res) { 
  res.render('wanttogo');
});

//ability to navigate to the Islands page
app.get('/islands', function(req, res) { 
  res.render('islands');
});

//ability to navigate to the Bali page
app.get('/bali',function(req,res){
  res.render('bali');
});

//ability to navigate to the Santorini page
app.get('/santorini',function(req,res){
  res.render('santorini');
});

//ability to navigate to the Cities page
app.get('/cities', function(req, res) {
  res.render('cities');
});

//ability to navigate to the Paris page
app.get('/paris',function(req,res){
  res.render('paris');
});

//ability to navigate to the Rome page
app.get('/rome',function(req,res){
  res.render('rome');
});

//ability to navigate to the Hiking page
app.get('/hiking', function(req, res) {
  res.render('hiking');
});

//ability to navigate to the Inca page
app.get('/inca',function(req,res){
  res.render('inca');
});

//ability to navigate to the Annapurna page
app.get('/annapurna',function(req,res){
  res.render('annapurna');
});

//End of Shamekh's code

app.timeout = 60000;
app.listen(3000);
