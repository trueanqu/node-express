const express = require('express');
const bodyParser = require('body-parser');

const leaderRouter = express.Router();

leaderRouter.use(bodyParser.json());

leaderRouter.route('/')
.all(setCommonResponseData)
.get((req, res, next) => {
    res.end('Will send all of the leaders to you!');
})
.post((req, res, next) => {
    res.end('Will add new leader with name: "' + req.body.name + '" and description: "' + req.body.description + '"');
})
.put((req, res, next) => {
    res.end('PUT operation is not supported for the /leaders');
})
.delete((req, res, next) => {
    res.end('Deleting all of the leaders!');
});

leaderRouter.route('/:leaderId')
.all(setCommonResponseData)
.get((req, res, next) => {
    res.end('Will send details about leader with id: "' + req.params.leaderId + '" to you!');
})
.post((req, res, next) => {
    res.end('POST operation is not supported for a particular leader.');
})
.put((req, res, next) => {
    res.end('Will update leader with id: "' + req.params.leaderId + '" with the following data:\r\n'
        + 'name: "' + req.body.name + '"\r\n'
        + 'description: "' + req.body.description + '"');
})
.delete((req, res, next) => {
    res.end('Deleting the leader with id: "' + req.params.leaderId + '"');
});

function setCommonResponseData(req, res, next) { //bad practice, the same method is in other routers
    res.statusCode = 200;
    res.setHeader('Content-Type','text/plain');
    next();
}

module.exports = leaderRouter;