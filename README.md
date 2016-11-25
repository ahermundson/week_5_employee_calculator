##Employee Data Collector

The purpose of this app is to collect an employee's name, ID number, job title and annual salary. Upon submit, the employee's information is appended to the table and the monthly salary expenditure is calculated. Employee's can be deleted from the table and their monthly expenditure will be removed from the total.




TO DO
[x] Create a database to hold employee information.
[x] Database should include first_name(VARCHAR), last_name(VARCHAR), id_number(INT), job_title(VAR CHAR), annual_salary(INTEGER), active(BOOLEAN)
[x] Setup file structure and routes.
[x] Bring in angular and perhaps bootstrap.
[x] CREATE GET REQUEST to pull employee information from the database
[x] CREATE POST request to put new employees in the database
[x] CREATE angular controllers to handle the content. Make sure to include $http in your parameter array. Look at the angular warehouse example.



PRO MODE
Bring in ngRoute and create a second view and controller as well as a nav bar. The second view will handle setting a monthly salary budget (in the database!) and display budget limit history. The first view then needs to be updated to tell the user if the active employees are over the latest budget limit set. There are several ways to solve this. One way is to research creating an Angular factory to share the budget number between controllers.

[x] Create, in the database, a table that allows you to set monthly budget
[] CREATE views for the header, footer, and nav.
[] Move employee form and table html into a template and have the controller point to it.
[] Create a monthlyBudget template that will have an input to take in a monthly budget and display it on the page.
[] Create routes to point to these templates
[] Create a PUT and GET request to the database to update and display the budget
[] Create an Angular Factory that holds this information so that it can be used by multiple controllers
