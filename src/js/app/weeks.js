'use strict';

function WeeksCtrl(Weeks) {
    this.test = 'test';
    this.weeks = [];
    this.weeks = Weeks.getWeeks();
}

function WeeksService(localStorageService) {
    var WeeksService = {};
    WeeksService.getWeeks = function() {
        var weeks = localStorageService.get('weeks');
        if (!weeks) {
            weeks = [{name: 'Week 1', total:200, transactions:[]}, {name: 'Week 2', total:200,transactions:[]},
                {name: 'Week 3', total:200, transactions:[]}, {name: 'Week 4', total:200, transactions:[]}];
        }
        return weeks;
    };

    return WeeksService;
}

angular.module('weeklyBudget.weeks', [])
    .controller('WeeksCtrl', ['Weeks', WeeksCtrl])
    .service('Weeks', ['localStorageService', WeeksService]);
