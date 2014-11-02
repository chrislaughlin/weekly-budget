'use strict';

function WeeksCtrl() {
    console.log('test');
}

function WeeksService() {
    var WeeksService = {};

    return WeeksService;
}

angular.module('weeklyBudget.weeks', [])
    .controller('WeeksCtrl', ['$scope', WeeksCtrl])
    .service('Weeks', [WeeksService]);
