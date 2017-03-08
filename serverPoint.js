'use strict';

var express = require('express')
var app = express()
var DBHelper=require('./js/DBHelper');
var router = express.Router();

//adding  static file
console.log(__dirname);
app.use('/lib', express.static(__dirname + '/lib'));
//supplying the starting page
app.get('/', function(req, res){
  console.log('Supplying the index file');
    res.sendFile('index.html', { root: __dirname } );
});
//test end point
app.get('/test', function (req, res) {
  console.log('came to test Call!');
  res.send('Hello World!')
});

app.get('/getDatayr', function (req, res) {
  console.log('aggregateEventsWithYearAndCont() called.');
  DBHelper.aggregateEventsWithYearAndCont(Number(req.query.startyr), Number(req.query.endyr), function(docs){
      res.send(docs)
      console.log('response sent');
  });
});

app.get('/getAllDatayr', function (req, res) {
  console.log('getAllDatayr() called.');
  DBHelper.findAllByyr(Number(req.query.startyr), Number(req.query.endyr), function(docs){
      res.send(docs)
      console.log('response sent');
  });
});

app.get('/getData', function (req, res) {
  console.log('getData() called.');
  DBHelper.aggregateEventsByYear(function(docs){
      res.send(docs)
      console.log('response sent');
  });
});

app.listen(3000, function () {
  console.log('Example app listening on port 3000!')
});