// index.js
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
app.get("/api/hello", function (req, res) {
  res.json({greeting: 'hello API'});
});


app.get('/api/:date?', (req, res) => {

  if (req.params.date == undefined) {
    res.send({"unix": new Date().getTime(), "utc": new Date().toGMTString()})
  }

  let timestamp;
  
  if (!isNaN(req.params.date)) { // Check if the string can be converted to a number
    timestamp = new Date(Number(req.params.date)).getTime(); // Convert the string to a number and create a Date object
  } else {
    if (!isDateValid(req.params.date)) {
      res.send({ "error" : "Invalid Date" })
      return;
    }
    timestamp = new Date(req.params.date).getTime(); // Attempt to create a Date object directly from the string
  }

  let output = {"unix": timestamp, "utc": new Date(timestamp).toGMTString()};

  res.send(output);
});

function isDateValid(dateStr) {
  return !isNaN(new Date(dateStr));
}

// Listen on port set in environment variable or default to 3000
var listener = app.listen(process.env.PORT || 3000, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
