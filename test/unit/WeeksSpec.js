'use strict';


describe('Weeks Module', function () {

    var scope1,
        scope2,
        weeksCtrl,
        weekCtrl,
        service,
        routeParams,
        defaultWeeks;

    beforeEach(function () {
        module('weeklyBudget.weeks');
        module('LocalStorageModule');
    });

    beforeEach(inject(function ($rootScope, $controller, Weeks) {
        scope1 = $rootScope.$new();
        scope2 = $rootScope.$new();
        routeParams = {};
        routeParams.index = 0;
        weeksCtrl = $controller('WeeksCtrl', {
            '$scope': scope1
        });
        service = Weeks;
        defaultWeeks = [{name: 'Week 1', total:200, transactions:[]}, {name: 'Week 2', total:200,transactions:[]},
            {name: 'Week 3', total:200, transactions:[]}, {name: 'Week 4', total:200, transactions:[]}];
    }));

    // CONTROLLER
    it('should have Weeks Controller', inject(function() {
        expect(weeksCtrl).toBeDefined();
    }));

    it('should get weeks from service',inject(function() {
        spyOn(service, 'getWeeks').and.returnValue(defaultWeeks);
        expect(weeksCtrl.weeks).toEqual(defaultWeeks);
    }));

    it('should clear all data', function() {
        spyOn(service, 'clearData').and.callFake(function(){return true});
        weeksCtrl.clearData();
        expect(service.clearData).toHaveBeenCalled();
    })

    it('should have Week Controller', inject(function($controller) {
        spyOn(service, 'getWeek').and.returnValue(defaultWeeks[0]);
        weekCtrl = $controller('WeekCtrl', {
            '$scope': scope2,
            '$routeParams': routeParams
        });
        expect(weekCtrl).toBeDefined();
    }));

    it('should return the week', inject(function($controller) {
        spyOn(service, 'getWeek').and.returnValue(defaultWeeks[0]);
        weekCtrl = $controller('WeekCtrl', {
            '$scope': scope2,
            '$routeParams': routeParams
        });
        expect(weekCtrl.week).toEqual(defaultWeeks[0]);
    }));

    it('should add the transaction to the week', inject(function($controller) {
        var count  = 0;
        spyOn(service, 'getWeek').and.callFake(function() {
            switch(count){
                case 0:
                    count++;
                    return defaultWeeks[0];
                break;
                case 1:
                    var week = defaultWeeks[0];
                    week.transactions.push(10);
                    return week;
                    break;
            }
        });
        spyOn(service, 'addTransaction').and.callFake(function(){return true});
        weekCtrl = $controller('WeekCtrl', {
            '$scope': scope2,
            '$routeParams': routeParams
        });
        expect(weekCtrl.week.transactions.length).toEqual(0);
        weekCtrl.addTransaction(10);
        expect(service.addTransaction).toHaveBeenCalledWith(0, 10);
        expect(weekCtrl.week.transactions.length).toEqual(1)
        expect(weekCtrl.tranaction).toEqual('');
    }));

    it('should not add blank values', inject(function($controller) {
        spyOn(service, 'addTransaction').and.callFake(function(){return true});
        weekCtrl = $controller('WeekCtrl', {
            '$scope': scope2,
            '$routeParams': routeParams
        });
        weekCtrl.addTransaction('');
        expect(service.addTransaction).not.toHaveBeenCalled();
    }));


    // SERVICE
    it('should have Weeks Service', inject(function() {
        expect(service).toBeDefined();
    }));

    it('should return an array of weeks if none in local storage', inject(function(localStorageService) {
        spyOn(localStorageService, 'get').and.returnValue(null);
        var weeks = defaultWeeks;
        expect(service.getWeeks()).toEqual(defaultWeeks);
    }));

    it('should return an array of weeks from local storage', inject(function(localStorageService) {
        spyOn(localStorageService, 'get').and.returnValue(defaultWeeks);
        expect(service.getWeeks()).toEqual(defaultWeeks);
        expect(localStorageService.get).toHaveBeenCalledWith('weeks');
    }));

    it('should return the week for an index', inject(function(localStorageService) {
        spyOn(localStorageService, 'get').and.returnValue(defaultWeeks);
        expect(service.getWeek(0)).toEqual(defaultWeeks[0]);
    }));

    it('should add transaction to week', inject(function(localStorageService) {
        spyOn(localStorageService, 'get').and.returnValue(defaultWeeks);
        spyOn(localStorageService, 'set');
        var newWeeks = defaultWeeks;
        newWeeks[0].transactions.push(10);
        service.addTransaction(0, 10);
        expect(localStorageService.set).toHaveBeenCalledWith('weeks', newWeeks);
    }));

    it('should clear all data', inject(function(localStorageService) {
        spyOn(localStorageService, 'clearAll');
        service.clearData();
        expect(localStorageService.clearAll).toHaveBeenCalled();
    }));

    // FILTERS
    it('should return the remaining total for the week', inject(function($filter) {
        var week = {
            total: '200',
            transactions: [
                '10',
                '5.50',
                '30',
                '6.66'
            ]
        };
        expect($filter('remainingTotal')(week)).toEqual(147.84);
    }));

});
