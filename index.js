const express = require('express');
const http = require('http'); //requests
const morgan = require('morgan'); //logging
const bodyParser = require('body-parser'); //parse body of request

const hostname = "localhost"
const port = 3000;

const app = express();
app.use(morgan('dev')); // dev - print additional information to the screen
app.use(bodyParser.json());

app.all('/dishes', (req, res, next) => { //next - net function, that is applicable to the /dishes resource
    res.statusCode = 200;
    res.setHeader('Content-Type','text/plain');
    next();
});

app.get('/dishes', (req, res, next) => {
    res.end('Will send all the dishes to you!');
});

app.post('/dishes', (req, res, next) => {
    res.end('We will add the dish: ' + req.body.name +
    ' with details: ' + req.body.description); //content parsed with body-parser will be stored in the req.body property (name and description properties should be sent with POST request)
});

app.delete('/dishes', (req, res, next) => { //should be restricted to priveleged users
    res.end('Deleting all the dishes!');
});

app.put('/dishes', (req, res, next) => {
    res.statusCode = 403; //not supported status code
    res.end('PUT operation is not supported on /dishes');
});

app.get('/dishes/:dishId', (req, res, next) => {
    res.end('Will send details for the dish: '
        + req.params.dishId);
});

app.post('/dishes/:dishId', (req, res, next) => {
    res.statusCode = 403; //not supported status code
    res.end('POST operation is not supported on /dishes/'
        + req.params.dishId);
});

app.delete('/dishes/:dishId', (req, res, next) => { //should be restricted to priveleged users
    res.end('Deleting dish: ' + req.params.dishId);
});

app.put('/dishes/:dishId', (req, res, next) => {
    res.write('Updating the dish: ' + req.params.dishId + '\n'); //add a line to the reply message
    res.end('Will update the dish: ' + req.body.name +
        ' with details: ' + req.body.description);
});

app.use(express.static(__dirname + '/public')); //serve files from ./public directory (. is index location stored in __directory)

app.use((req, res, next) => {
    res.statusCode = 200;
    res.setHeader('Content-Type','text/html');
    res.end('<html><body><h1>This is an Express Server</h1></body></html>');
});

const server = http.createServer(app);

server.listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}`);
});
