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

app.controller('EmployeeController', ["$http", function($http) {
  console.log('Within Get Employee Controller');
  var self = this;
  self.employees = [];
  self.newEmployee = {};
  self.expenditure;
  getEmployees();
  getExpenditure();

  //Fetch employees from database to display on page
  function getEmployees() {
    $http.get('/employees')
    .then(function (response){
      console.log(response.data);
      self.employees = response.data;
    })
  }

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

app.controller('BudgetController', ["$http", function($http) {
  console.log("In Budget Controller");
  var self = this;
  self.monthlyBudget = '';
  self.newBudgetInput = '';
  getBudget();
  function getBudget() {
    $http.get('/budget')
    .then(function (response){
      console.log("Response.data: ", response.data);
      self.monthlyBudget = response.data[0].budget;
    })
  }

  self.newBudget = function() {
    console.log("got to newBudget function");
    var newBudgetNumber = {
      newMonthlyBudget: self.newBudgetInput
    }
    console.log(newBudgetNumber);
    $http.put('/budget', newBudgetNumber)
      .then(function(response) {
        console.log('PUT finished. Employee updated.');
        getBudget();
        self.newBudgetInput = '';
      });
  }
}]);

app.controller('HomeController', ["$http", function($http) {
  console.log("In Home Controller");

}]);
