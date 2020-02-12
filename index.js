const express = require('express');
const http = require('http'); //requests
const morgan = require('morgan'); //logging
const bodyParser = require('body-parser'); //parse body of request

const dishRouter = require('./routes/dishRouter');
const promoRouter = require('./routes/promoRouter');
const leaderRouter = require('./routes/leaderRouter');

const hostname = "localhost"
const port = 3000;

const app = express();
app.use(morgan('dev')); // dev - print additional information to the screen
app.use(bodyParser.json());

app.use('/dishes', dishRouter);
app.use('/promotions', promoRouter);
app.use('/leaders', leaderRouter);

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
