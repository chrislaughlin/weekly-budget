'use strict';

function WeeksCtrl(Weeks) {
    this.weeks = [];
    this.weeks = Weeks.getWeeks();
    this.clearData = function() {
        Weeks.clearData();
        this.weeks = Weeks.getWeeks();
    }
}

function WeeksService(localStorageService) {
    var _WEEKS = 'weeks';
    var WeeksService = {};
    WeeksService.getWeeks = function() {
        var weeks = localStorageService.get(_WEEKS);
        if (!weeks) {
            weeks = [{name: 'Week 1', total:200, transactions:[]}, {name: 'Week 2', total:200,transactions:[]},
                {name: 'Week 3', total:200, transactions:[]}, {name: 'Week 4', total:200, transactions:[]}];
            localStorageService.set(_WEEKS, weeks);
        }
        return weeks;
    };
    WeeksService.getWeek = function(index) {
        return localStorageService.get(_WEEKS)[index];
    };
    WeeksService.addTransaction = function(index, transaction) {
        var weeks = this.getWeeks();
        weeks[index].transactions.push(transaction);
        localStorageService.set(_WEEKS, weeks);
    };
    WeeksService.clearData = function() {
        localStorageService.clearAll();
    };

    return WeeksService;
}

function remainingTotal() {
    return function(week) {
        var sum  = 0;
        _.each(week.transactions, function(trans) {
            sum += parseFloat(trans);
        });
        return parseFloat(week.total - sum).toFixed(2);
    }
}

function WeekCtrl(Weeks, $routeParams) {
    this.week = {};
    this.tranaction = 0;
    this.week = Weeks.getWeek($routeParams.index);
    this.addTransaction = function(transaction) {
        if (!_.isEmpty(transaction) && !transaction.match(/[a-z]/i)) {
            Weeks.addTransaction($routeParams.index, transaction);
            this.week = Weeks.getWeek($routeParams.index);
            this.tranaction = '';
        }

    };
}

function backButton() {
    return {
        restrict: 'A',

        link: function (scope, element, attrs, $location) {
            element.bind('click', goBack);
            function goBack() {
                window.history.back();
            }
        }
    }
};

angular.module('weeklyBudget.weeks', [])
    .controller('WeeksCtrl', ['Weeks', WeeksCtrl])
    .controller('WeekCtrl', ['Weeks', '$routeParams', WeekCtrl])
    .service('Weeks', ['localStorageService', WeeksService]).filter('remainingTotal', remainingTotal)
    .directive('backButton', backButton);
