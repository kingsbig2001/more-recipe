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

//Setting up Dummy data for API route
const recipe = [{id : 1, name : 'Pepper soup', upvote : 44, ingredients :['rice', 'okro', 'fish'], reviews: 'this is a review for this '},
 {id : 2, name : 'Egusi', upvote : 33, ingredients: ['okro', 'fish', 'onion'], reviews: 'another review here'},
 {id: 3, name : 'Rice', upvote : 33, ingredients: ['meat', 'fish', 'pepper'], reviews : 'last review'}
];

// Setting up API routes
app.get('/api', (req, res) => res.status(200).send({
    message: 'Welcome to the Recipe API!',
  }));
// Setup a default catch-all route that sends back a welcome message in JSON format.
app.get('/api/recipe', (req, res) => res.status(200).send(recipe));

//Search recipe using id
app.get('/api/recipe/:upvote', function(req, res) {
    let upvote = parseInt(req.params.upvote, 10);
    let result = recipe.filter(voted => voted.upvote === upvote);
 
    if (!result) {
        res.sendStatus(404);
    } else {
        res.send(result);
    }
});

app.get('/api/recipe/:id', function(req, res) {
    let id = parseInt(req.params.id, 10);
    let result = recipe.filter(r => r.id === id)[0];

   if (!result) {
        res.sendStatus(404);
    } else {
        res.send(result);
    }
});
// app.post('/api/recipe', (req, res)=>{
//     //let recipe = req.body;
//     console.log(req.body);
//     res.send(req.body);
// });
app.post('/api/recipe', function(req, res) {
    let item = req.body;
 console.log(item.id);
    if (!item.id) {
        return res.sendStatus(500);
    }
 
    recipe.push(item);
 //return posted recipe
 let result = recipe.filter(newRecipe => newRecipe.id === item.id)[0];
    res.send(result);
});

app.put('/api/recipe/:id', function(req, res) {
    let id = parseInt(req.params.id, 10);
    let existingItem = recipe.filter(r => r.id === id)[0];
 
    if (!existingItem) {
        let item = req.body;
        item.id = id;
        recipe.push(item);
        res.setHeader('Location', '/api/recipe/' + id);
        res.sendStatus(201);
    } else {
        existingItem.name = req.body.name;
        res.sendStatus(204);
    }
});
//Delete Method
app.delete('/app/recipe/:id', function(req, res) {
    let id = parseInt(req.params.id, 10);
    let existingItem = recipe.filter(r => r.id === id)[0];
 
    if (!existingItem) {
        return res.sendStatus(404);
    }
 
    recipe = recipe.filter(r => r.id !== id);
    res.sendStatus(204);
});

module.exports = app;