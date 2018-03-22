const express = require('express')
const app = express()

app.use(express.static('public'))

app.get("/", (request, response) => {
  response.sendFile(__dirname + '/views/index.html')
})

app.get('/:timestamp', (req, res) => {
  var output = {
    unix: null,
    natural: null
  };

  var ts = req.params.timestamp;
  var tst = getType(ts);
  if (tst === 'unix') {
    output.unix = parseInt(ts, 10);
    var dt = new Date(parseInt(ts, 10) * 1000);
    output.natural = toNatural(dt);
  }

  if (tst === 'natural') {
    output.unix = toUnix(ts);
    output.natural = ts;
  }

  res.json(output);
})

// listen for requests :)
const listener = app.listen(process.env.PORT, () => {
  console.log(`Your app is listening on port ${listener.address().port}`)
})

function getType(param) {
  if (!param.match(/[^$,.\d]/) && parseInt(param, 10) >= 0 && parseInt(param, 10) <= 253402300799) {
    return 'unix';
  }

  if (Date.parse(param)) {
    return 'natural';
  }

  return 'invalid';
}

function toNatural(date) {
  var options = {
    month: 'long',
    day: 'numeric',
    year: 'numeric'
  }

  return date.toLocaleDateString('en-US', options);
}
function toUnix(timestamp) {
  return Date.parse(timestamp) / 1000;
}