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

//Setting up data for our route
const recipe = [{id : 1, name : 'Pepper soup'}, {id : 2, name : 'Egusi'}, {id: 3, name : 'Rice'}];

// Setting up API routes
app.get('/api', (req, res) => res.status(200).send({
    message: 'Welcome to the Recipe API!',
  }));
// Setup a default catch-all route that sends back a welcome message in JSON format.
app.get('/api/recipe', (req, res) => res.status(200).send(recipe));

//Search recipe using id
app.get('/api/recipe/:id', function(req, res) {
    const id = parseInt(req.params.id, 10);
    const result = recipe.filter(r => r.id === id)[0];
 
    if (!result) {
        res.sendStatus(404);
    } else {
        res.send(result);
    }
});

app.post('/api/recipes', (req, res)=>{
    //let recipe = req.body;
    console.log(req.body);
    res.send(req.body);
});

app.put('api/recipes', (req, res)=>{
    app.render(res.json);
});


module.exports = app;