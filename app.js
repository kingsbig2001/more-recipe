const express = require('express');
const logger = require('morgan');
const bodyParser = require('body-parser');

// Set up the express app
const app = express();

// Log requests to the console.
app.use(logger('dev'));

// Parse incoming requests data (https://github.com/expressjs/body-parser)
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// Setting up API routes
app.get('/api', (req, res) => res.status(200).send({
    message: 'Welcome to the Recipe API!',
  }));
// Setup a default catch-all route that sends back a welcome message in JSON format.
app.get('*', (req, res) => res.status(200).send({
  message: 'Welcome to the beginning of nothingness.',
}));

app.post('/api/recipes', (req, res)=>{
    console.log(req.body);
    res.send(req.body);
});

app.put('*', (req, res)=>{
    app.render(res.json);
});


module.exports = app;