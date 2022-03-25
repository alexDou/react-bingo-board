const express = require('express');
const http = require('http');
const path = require("path");
const fs = require("fs");
const bodyParser = require('body-parser');

const readSend = async (filePath, res, timeout = 0) => {
  let statusCode = 200;
  let response = {};
  try {
    response = fs.readFileSync(filePath, 'utf-8');
    res.set('Content-Type', 'application/json');
  } catch (err) {
    statusCode = 400;
    response = err;
  }

  setTimeout(() => {
    res.status(statusCode).send(response);
  }, timeout);
};

// Express
const app = express();
const accountServer = http.createServer(app);

app.use(bodyParser.json({
  type: 'application/json',
  extended: true
}));

// CORS
app.use(function(req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Credentials', 'true');
  res.header('Access-Control-Allow-Headers', '*');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT');
  next();
});

/**
 * Endpoints
 */
app.post('/fetch', (req, res) => {
  readSend(path.resolve(__dirname, './data/fetch.json'), res, 2000);
});
/**
 * ------ Endpoints END -------- *
 */

// start accountServer
accountServer.listen(3030, () => {
  console.log(`Server is listening on port ${accountServer.address().port}`);
});
