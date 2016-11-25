var express = require('express');
var router = express.Router();
var pg = require('pg');
var connectionString = 'postgres://localhost:5432/employees';

router.get('/', function(req, res) {
  console.log('reached get route!')
  // get customers from DB
  pg.connect(connectionString, function(err, client, done) {
    if(err) {
      console.log('connection error: ', err);
      res.sendStatus(500);
    }

    client.query('SELECT * FROM employees ORDER BY active, id DESC', function(err, result) {
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

router.get('/expenditure', function(req, res) {
  console.log('reached expenditure get route!')
  // get customers from DB
  pg.connect(connectionString, function(err, client, done) {
    if(err) {
      console.log('connection error: ', err);
      res.sendStatus(500);
    }

    client.query("SELECT SUM(annual_salary) FROM employees WHERE active = 'active';", function(err, result) {
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


router.post('/', function(req, res) {
  console.log('reached PostEmployeeController route!')
  var employee = req.body;
  console.log("Employees post: ", employee)

  pg.connect(connectionString, function(err, client, done) {
    if(err) {
      console.log('connection error: ', err);
      res.sendStatus(500);
    }
    client.query('INSERT INTO employees(first_name, last_name, id_number, job_title, annual_salary) ' +
    'VALUES ($1, $2, $3, $4, $5)',
    [employee.first_name, employee.last_name, employee.id_number, employee.job_title, employee.annual_salary],
    function(err, result) {
      done(); // close the connection.

      if(err) {
        console.log('select query error: ', err);
        res.sendStatus(500);
      }
      console.log("post complete");
      res.sendStatus(201);
    });
  });
});


router.put('/:id', function(req,res) {
  var id = req.params.id;
  console.log(id);
  pg.connect(connectionString, function(err, client, done) {
    if(err) {
      console.log('connection error: ', err);
      res.sendStatus(500);
    }
    client.query("UPDATE employees SET active = CASE WHEN active = 'active' THEN 'inactive' ELSE 'active' END WHERE id = $1;",
    [id],
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
})

module.exports = router;
