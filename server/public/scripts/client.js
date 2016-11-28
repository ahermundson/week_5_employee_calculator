var app = angular.module('myApp',['ngRoute']);

app.config(['$routeProvider', function($routeProvider) {
  $routeProvider
  .when('/home', {
    templateUrl: '/views/templates/home.html',
    controller: 'HomeController',
    controllerAs: 'home'
  })
  .when('/form', {
    templateUrl: '/views/templates/form.html',
    controller: 'EmployeeController',
    controllerAs: 'employee'
  })
  .when('/budget', {
    templateUrl: '/views/templates/budget.html',
    controller: 'BudgetController',
    controllerAs: 'budget'
  })
  .otherwise({
    redirectTo: 'home'
  });
}]);


//Start of employee Controller
app.controller('EmployeeController', ["$http", "budgetService", function($http , budgetService) {
  var self = this;
  self.employees = [];
  self.newEmployee = {};
  self.expenditure = 0;
  getEmployees();
  getExpenditure();

  //Get the current budget and check to see if monthly expenditures are over or under budget
  budgetService.getCurrentBudget()
    .then(
      function (result) {
        console.log("Reult Console: ", result[0].budget);
        self.currentMonthlyBudget = result[0].budget;
        console.log(self.currentMonthlyBudget + " " + self.expenditure);
        if (self.currentMonthlyBudget < self.expenditure) {
          self.budgetEvaluator = "over";
        } else {
          self.budgetEvaluator = "under";
        };
      },
      function (error) {
        console.log(error.statusText);
      }
    );


  //Fetch employees from database to display on page
  function getEmployees() {
    $http.get('/employees')
    .then(function (response){
      console.log(response.data);
      self.employees = response.data;
    })
  }


  //Calculate monthly expenditures
  function getExpenditure() {
    $http.get('/employees/expenditure')
    .then(function (response){
      // console.log(response.data[0].sum);
      self.expenditure = Number(response.data[0].sum) / 12;
      console.log(self.expenditure);
    })
  }



  //Post new employess and run getEmployees when complete
  self.postEmployee = function() {
    console.log("new employee: ", self.newEmployee);
    $http.post('/employees', self.newEmployee)
    .then(function (response){
      console.log('POST finished. Get books again.');
      getEmployees();
      getExpenditure();
      self.newEmployee = {};
      self.employeeinfo.$setPristine();
      self.employeeinfo.$setUntouched();
    })
  }

  //toggle between active and inactive when clicked
  self.active = function(index) {
    var id = self.employees[index].id
    $http.put('/employees/' + id)
      .then(function(response) {
        console.log('PUT finished. Employee updated.');
        getEmployees();
        getExpenditure();
      });
  }

}]); ///end of EmployeeController

app.controller('BudgetController', ["$http", "budgetService", function($http, budgetService) {
  console.log("In Budget Controller");
  var self = this;
  self.budget = [];
  self.newBudgetInput = '';
  getBudget();
  function getBudget() {
    $http.get('/budget')
    .then(function (response){
      console.log("Response.data: ", response.data);
      self.budget = response.data;
      for (var i = 0; i < self.budget.length; i++) {
        self.budget[i].date = moment(self.budget[i].date).format('MM/DD/YYYY');
        // self.budget[i].date = momentDate.format("LLL");
        // console.log(self.budget[i].date);
      }
      self.currentBudget = self.budget[0].budget;
    })
  }

  self.newBudget = function() {
    console.log("got to newBudget function");
    var budgetDate = moment();
    var newBudgetNumber = {
      newMonthlyBudget: self.newBudgetInput,
      date: budgetDate
    }
    // console.log(newBudgetNumber);
    $http.post('/budget', newBudgetNumber)
      .then(function(response) {
        console.log('PUT finished. Employee updated.');
        getBudget();
        self.newBudgetInput = '';
      });

      budgetService.getCurrentBudget()
        .then(
          function (result) {
            console.log("Reult Console: ", result[0].budget);
            self.currentMonthlyBudget = result[0].budget;
            console.log(self.currentMonthlyBudget + " " + self.expenditure);
            if (self.currentMonthlyBudget < self.expenditure) {
              self.budgetEvaluator = "over";
            } else {
              self.budgetEvaluator = "under";
            };
          },
          function (error) {
            console.log(error.statusText);
          }
        );
  }
}]); ///end of budget controller

app.controller('HomeController', ["$http", function($http) {
  console.log("In Home Controller");

}]); //end of home controller



//budget Service to get the current budget and share it with the employee and budget controllers
app.service('budgetService', ["$http", "$q", function($http, $q) {
  var deferred = $q.defer();

  this.getCurrentBudget = function() {
    return $http.get('/budget')
    .then(function (response){
       deferred.resolve(response.data);
       return deferred.promise;
    }, function(response) {
        deferred.reject(response);
        return deferred.promise
    })
  }
}]); //end of budget service
