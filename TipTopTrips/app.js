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

//Pages Routes

//ability to navigate to the Want-To-Go-List page
app.get('/want-to-go', function(req, res) { 
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
 



app.post('/paris', (req, res) => {
  let err_msg = '';
          err_msg = "Paris is added to yout want-to-go list";
          return res.render('paris', { err_msg: err_msg } );
  
  });


 app.post('/bali', (req, res) => {
    let err_msg = '';

            err_msg = "Bali is added to yout want-to-go list";
            return res.render( 'bali',{ err_msg: err_msg } );
  
    });

  app.post('/inca', (req, res) => {
      let err_msg = '';
  
              err_msg = "Inca is added to yout want-to-go list";
              return res.render( 'inca',{ err_msg: err_msg } );
    
      });
 app.post('/annapurna', (req, res) => {
    let err_msg = '';
    
         err_msg = "Annapurna is added to yout want-to-go list";
          return res.render( 'annapurna',{ err_msg: err_msg } );
      
        });
 
app.post('/rome', (req, res) => {
    let err_msg = '';
          
    err_msg = "Rome is added to yout want-to-go list";
    return res.render( 'rome',{ err_msg: err_msg } );
            
              });
app.post('/santorini', (req, res) => {
    let err_msg = '';
                
    err_msg = "Santorini is added to yout want-to-go list";
    return res.render( 'santorini',{ err_msg: err_msg } );
                  
                    }); 

//End of Pages Routes

app.timeout = 60000;
app.listen(3000);
