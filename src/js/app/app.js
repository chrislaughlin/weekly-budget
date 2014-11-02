'use strict';


// Declare app level module which depends on filters, and services
angular.module('weeklyBudget', [
    'ngRoute',
    'weeklyBudget.weeks'
]).config(['$routeProvider', function ($routeProvider) {
    // Routes
    $routeProvider.when('/main', {templateUrl: 'partials/main.html', controller: 'WeeksCtrl'});
    $routeProvider.otherwise({redirectTo: '/main'});
}]);
