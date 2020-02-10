const express = require('express');
const bodyParser = require('body-parser');

const dishRouter = express.Router();

dishRouter.use(bodyParser.json());

dishRouter.route('/') //dishes uri will be passed in the index.js file, so here we are assuming, that we are working with root of '/dishes'
.all((req, res, next) => { //next - net function, that is applicable to the /dishes resource
    res.statusCode = 200;
    res.setHeader('Content-Type','text/plain');
    next();
})
.get((req, res, next) => {
    res.end('Will send all the dishes to you!');
})
.post((req, res, next) => {
    res.end('We will add the dish: ' + req.body.name +
    ' with details: ' + req.body.description); //content parsed with body-parser will be stored in the req.body property (name and description properties should be sent with POST request)
})
.delete((req, res, next) => { //should be restricted to priveleged users
    res.end('Deleting all the dishes!');
})
.put((req, res, next) => {
    res.statusCode = 403; //not supported status code
    res.end('PUT operation is not supported on /dishes');
});

module.exports = dishRouter;