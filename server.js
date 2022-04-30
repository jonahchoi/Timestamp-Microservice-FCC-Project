// server.js
// where your node app starts

// init project
var express = require('express');
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({optionsSuccessStatus: 200}));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});


// your first API endpoint... 
app.get("/api/:date?", function (req, res) {
  let input = req.params.date;
  let date;
  
  //Check if input is in unix
  if(/\d{5,13}/.test(input)){
    date = new Date(parseInt(input,10));
  }
  //check if there was no input
  else if(!input){
    date = new Date();
  }
  //check if invalid date
  else if(!(new Date(input)).getTime()){
    return res.json({error: "Invalid Date"});
    
  }
  //For regular dates
  else{
    date = new Date(input);
  }
  
  res.json({unix: date.getTime(), utc: date.toUTCString()});
});



// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
