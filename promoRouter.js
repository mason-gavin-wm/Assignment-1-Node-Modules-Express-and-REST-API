/**
 * Created by session1 on 10/26/16.
 */
var express = require('express');
var morgan = require('morgan');
var bodyParser = require('body-parser');

var hostname = 'localhost';
var port = 3002;

var app = express();

app.use(morgan('dev'));

var promoRouter = express.Router();

promoRouter.use(bodyParser.json());


promoRouter
    .route('/')
    .all(function (req, res, next) {
        res.writeHead(200, {
            'Content-Type': 'text/plain'
        });
        next()
    })

    .get(function (req, res, next) {
        res.end('We will send all the promotions to you!')
    })

    .post(function (req, res, next) {
        res.end('We will add the dish: ' + req.body.name + ' with details: ' + req.body.description)
    })

    .delete(function (req, res, next) {
        res.end('Farewell promotions.')
    });


promoRouter
    .route('/:promoId')
    .all(function (req, res, next) {
        res.writeHead(200, {
            'Content-Type': 'text/plain'
        });
        next()
    })

    .get(function (req, res, next) {
        res.end('We will send details of the promotion: ' + req.params.promoId + ' to you!')
    })

    .put(function (req, res, next) {
        res.write('Updating the promotion: ' + req.params.promoId + '\n');
        res.end('We will update the promotion: ' + req.body.name +
            ' with details: ' + req.body.description)
    })

    .delete(function (req, res, next) {
        res.end('Farewell promotion: ' + req.params.promoId)
    });
app.use('/promo',promoRouter);

app.use(express.static(__dirname + '/public'));

app.listen(port, hostname, function(){
    console.log(`Server running at http://${hostname}:${port}/`);
});