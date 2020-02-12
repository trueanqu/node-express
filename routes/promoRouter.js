const express = require('express');
const bodyParser = require('body-parser')

const promoRouter = express.Router();

promoRouter.use(bodyParser.json());

promoRouter.route('/')
.all(setCommonResponseData)
.get((req, res, next) => {
    res.end('Will send all of the promotions to you!');
})
.post((req, res, next) => {
    res.end('Will add promotion with name: "' + req.body.name + '" and description: "' + req.body.description + '"');
})
.put((req, res, next) => {
    res.end('PUT operation is not supported for /promotions.');
})
.delete((req, res, next) => {
    res.end('Deleting all of the promotions!');
});

promoRouter.route('/:promoId')
.all(setCommonResponseData)
.get((req, res, next) => {
    res.end('Will send all the details about promotion with id: ' + req.params.promoId);
})
.post((req, res, next) => {
    res.end('POST operation is not supported for a particular promotion.');
})
.put((req, res, next) => {
    res.end('The promotion with id: "' + req.params.promoId + '" will be updated with the following data:\r\n'
    + 'name: "' + req.body.name + '"\r\n'
    + 'description: "' + req.body.description + '"');
})
.delete((req, res, next) => {
    res.end('Deleting the promotion with id: "' + req.params.promoId + '"');
});

function setCommonResponseData(req, res, next) { //bad practice, the same method is in other routers
    res.statusCode = 200;
    res.setHeader('Content-Type','text/plain');
    next();
}

module.exports = promoRouter;