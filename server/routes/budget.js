var express = require('express');
var router = express.Router();
var pg = require('pg');
var connectionString = 'postgres://localhost:5432/employees';

router.get('/', function(req, res) {
  console.log('reached get budget route!')
  // get customers from DB
  pg.connect(connectionString, function(err, client, done) {
    if(err) {
      console.log('connection error: ', err);
      res.sendStatus(500);
    }

    client.query('SELECT * FROM budget ORDER BY id DESC', function(err, result) {
      done(); // close the connection.

      if(err) {
        console.log('select query error: ', err);
        res.sendStatus(500);
      }
      console.log(result.rows);
      res.send(result.rows);
    });
  });
});

router.post('/', function(req,res) {
  console.log(req.body);
  var newBudget = req.body.newMonthlyBudget;
  var date = req.body.date;
  pg.connect(connectionString, function(err, client, done) {
    if(err) {
      console.log('connection error: ', err);
      res.sendStatus(500);
    }
    client.query("INSERT INTO budget (budget, date) " +
    "VALUES ($1,$2)",
    [newBudget, date],
    function(err, result) {
      done(); // close the connection.

      if(err) {
        console.log('select query error: ', err);
        res.sendStatus(500);
      }
      console.log("put complete");
      res.sendStatus(201);
    });
  });
});

module.exports = router;
