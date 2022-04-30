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
app.get("/api/:date", function (req, res) {
  let input = req.params.date;
  let date, unixDate, utcDate;
  if(/\d{5,13}/.test(input)){
    date = new Date(parseInt(input,10));
    unixDate = input;
    utcDate = date.toUTCString();
  }
  else if(!new Date(input)){
    console.log('error')
  }
  else{
    date = new Date(input);
    unixDate = date.getTime();
    utcDate = date.toUTCString();
  }
  
  res.json({unix: unixDate, utc: utcDate});
});



// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
