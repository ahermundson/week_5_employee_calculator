var app = angular.module('myApp',[]);

// app.config(['$routeProvider', function($routeProvider) {
//   $routeProvider
//   .when('/home', {
//     templateUrl: '/views/templates/home.html',
//     controller: 'HomeController'
//   })
//   .otherwise({
//     redirectTo: 'home'
//   });
// }]);

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

}]);


// app.controller('PostEmployeeController', ["$http", function($http) {
//   console.log('Within Post Employee Controller');
//   var self = this;
//
//
//
// }]);


// $(document).ready(function() {
//     var array = [];
//     var monthlyExp = 0;
//     $('#employeeinfo').on('submit', function(event) {
//       event.preventDefault();
//       // initialize a new variable as an empty object
//       var values = {};
//       // convert the form inputs into an array
//       var fields = $('#employeeinfo').serializeArray();
//       // iterate over the array and transfer each index into a new property on an object with the value of what was entered.
//       fields.forEach(function(element, index, array) {
//         // review index notation vs. dot notation on objects
//         // here, dot notation wouldn't work
//         values[element.name] = element.value;
//       });
//
//       // $('#employeeinfo').find('input[type=text], input[type=number]').val('');
//
//       // append to DOM
//       appendDom(values);
//       // clear out inputs
//       (this).reset();
//       $('#employeefirstname').focus();
//     });
//     //remove employee when delete button is clicked
//     $('#employeeListTable').on('click', '.delete', deleteEmployee);
//
//     //function to append new employee to table
//     function appendDom(empInfo) {
//       var expenditure = parseFloat(empInfo.employeeAnnualSalary / 12);
//       $('#employeeListTable').append('<tr class="employee"><td>' + empInfo.employeefirstname +
//       '</td><td>' + empInfo.employeelastname +
//       '</td><td>' + empInfo.employeeIdNumber +
//       '</td><td>' + empInfo.employeeJobTitle +
//       '</td><td>' + parseFloat(empInfo.employeeAnnualSalary).toLocaleString('en', {style: 'currency', currency: 'USD'}) +
//       '</td><td><button class="delete">Delete</button></td></tr>');
//       $('.employee').fadeIn('slow');
//       $('#employeeListTable').find('.employee:last').data("mExpenditure", expenditure);
//       monthlyExp = monthlyExp + expenditure;
//       $('#monthlyExpenditures').text(monthlyExp.toLocaleString('en', {style: 'currency', currency: 'USD'}));
//     }
//
//     //function to delete employee info from dom and reduce monthly expenditure total
//     function deleteEmployee() {
//       if (confirm("Are you sure you wish to delete this employee?")) {
//       monthlyExp -= $(this).closest('.employee').data("mExpenditure");
//       $('#monthlyExpenditures').text(monthlyExp.toLocaleString('en', {style: 'currency', currency: 'USD'}));
//       $(this).closest('.employee').fadeOut('slow', function() {$(this).remove()});
//       }
//     }
//
// });
