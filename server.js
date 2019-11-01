const express = require('express')
const app = express()
const cors = require('cors');

app.use(cors());

app.use(express.static('public'))

app.get("/", (request, response) => {
  response.sendFile(__dirname + '/views/index.html')
})

app.get('/api/timestamp/:timestamp?', (req, res) => {
  let date = null;
  if(!req.params.timestamp) date = new Date(Date.now());
  else {
    if(isNaN(parseInt(req.params.timestamp*1))) date = new Date(req.params.timestamp);
    else date = new Date(parseInt(req.params.timestamp*1));
  }
  if(date == "Invalid Date") res.json({ "error": "Invalid Date" });
  else res.json({ "unix": date.getTime(), "utc": date.toUTCString() });
})

// listen for requests :)
const listener = app.listen(process.env.PORT, () => {
  console.log(`Your app is listening on port ${listener.address().port}`)
})
