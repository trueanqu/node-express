const express = require('express');
const bodyParser = require('body-parser');

const dishRouter = express.Router();

dishRouter.use(bodyParser.json());

dishRouter.route('/') //dishes uri will be passed in the index.js file, so here we are assuming, that we are working with root of '/dishes'
.all(setCommonResponseData)
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

dishRouter.route('/:dishId')
.all(setCommonResponseData)
.all((req, res, next) => {
    res.setHeader('dishId',`${req.params.dishId}`);
    next();
})
.get((req, res, next) => {
    res.end('Will send details about dish with id:' + req.params.dishId + ' to you!');
})
.post((req, res, next) => {
    res.statusCode = 403;
    res.end('POST operation is not supported on /dishes/' + req.params.dishId);
})
.delete((req, res, next) => {
    res.end('Deleting the dish with id:' + req.params.dishId + ', name:"' + req.body.name + '", description:"' + req.body.description + '"');
})
.put((req, res, next) => {
    res.end('Updating entry with id:' + req.params.dishId + ' ... Setting name:"' + req.body.name + '", description:"' + req.body.description + '"');
});

function setCommonResponseData(req, res, next) {
    res.statusCode = 200;
    res.setHeader('Content-Type','text/plain');
    next();
}

module.exports = dishRouter;