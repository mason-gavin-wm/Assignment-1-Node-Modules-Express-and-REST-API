/**
 * Created by session1 on 10/26/16.
 */
var express = require('express');
var morgan = require('morgan');
var bodyParser = require('body-parser');

var hostname = 'localhost';
var port = 3001;

var app = express();

app.use(morgan('dev'));

var leaderRouter = express.Router();

leaderRouter.use(bodyParser.json());


leaderRouter
    .route('/')
    .all(function (req, res, next) {
        res.writeHead(200, {
            'Content-Type': 'text/plain'
        });
        next()
    })

    .get(function (req, res, next) {
        res.end('We will send all the leaders to you!')
    })

    .post(function (req, res, next) {
        res.end('We will add the leader: ' + req.body.name + ' with details: ' + req.body.description)
    })

    .delete(function (req, res, next) {
        res.end('Farewell all leaders.')
    });


leaderRouter
    .route('/:leaderId')
    .all(function (req, res, next) {
        res.writeHead(200, {
            'Content-Type': 'text/plain'
        });
        next()
    })

    .get(function (req, res, next) {
        res.end('We will send details of the leader: ' + req.params.leaderId + ' to you!')
    })

    .put(function (req, res, next) {
        res.write('Updating the leader: ' + req.params.leaderId + '\n');
        res.end('We will update the leader: ' + req.body.name +
            ' with details: ' + req.body.description)
    })

    .delete(function (req, res, next) {
        res.end('Farewell leader: ' + req.params.leaderId)
    });

app.use('/leadership',leaderRouter);

app.use(express.static(__dirname + '/public'));

app.listen(port, hostname, function(){
    console.log(`Server running at http://${hostname}:${port}/`);
});