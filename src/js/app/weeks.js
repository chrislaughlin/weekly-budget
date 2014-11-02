'use strict';

function WeeksCtrl(Weeks) {
    this.weeks = [];
    this.weeks = Weeks.getWeeks();
}

function WeeksService(localStorageService) {
    var WEEKS = 'weeks';
    var WeeksService = {};
    WeeksService.getWeeks = function() {
        var weeks = localStorageService.get(WEEKS);
        if (!weeks) {
            weeks = [{name: 'Week 1', total:200, transactions:[]}, {name: 'Week 2', total:200,transactions:[]},
                {name: 'Week 3', total:200, transactions:[]}, {name: 'Week 4', total:200, transactions:[]}];
        }
        return weeks;
    };
    WeeksService.getWeek = function(index) {
        return localStorageService.get(WEEKS)[index];
    };

    return WeeksService;
}

function remainingTotal() {
    return function(week) {
        var sum  = 0;
        _.each(week.transactions, function(trans) {
            sum += trans;
        });
        return week.total - sum;
    }
}

function WeekCtrl(Weeks, $routeParams) {
    this.week = {};
    this.week = Weeks.getWeek($routeParams.index);
}

angular.module('weeklyBudget.weeks', [])
    .controller('WeeksCtrl', ['Weeks', WeeksCtrl])
    .controller('WeekCtrl', ['Weeks', '$routeParams', WeekCtrl])
    .service('Weeks', ['localStorageService', WeeksService]).filter('remainingTotal', remainingTotal);
