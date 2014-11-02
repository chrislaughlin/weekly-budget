'use strict';


// Declare app level module which depends on filters, and services
angular.module('weeklyBudget', [
    'ngRoute',
    'weeklyBudget.weeks',
    'LocalStorageModule'
]).config(['$routeProvider', 'localStorageServiceProvider', function ($routeProvider, localStorageServiceProvider) {
    // Routes
    $routeProvider.when('/weeks', {templateUrl: 'partials/weeks.html', controller: 'WeeksCtrl'});
    $routeProvider.otherwise({redirectTo: '/weeks'});

    //Local Storage
    localStorageServiceProvider
        .setPrefix('weeklyBudget');
}]);
