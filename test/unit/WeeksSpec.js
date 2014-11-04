'use strict';


describe('Weeks Module', function () {

    var scope1,
        scope2,
        weeksCtrl,
        weekCtrl,
        service,
        routeParams,
        defaultWeeks = [{name: 'Week 1', total:200, transactions:[]}, {name: 'Week 2', total:200,transactions:[]},
            {name: 'Week 3', total:200, transactions:[]}, {name: 'Week 4', total:200, transactions:[]}];

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
    }));

    // CONTROLLER
    it('should have Weeks Controller', inject(function() {
        expect(weeksCtrl).toBeDefined();
    }));

    it('should get weeks from service',inject(function() {
        spyOn(service, 'getWeeks').and.returnValue(defaultWeeks);
        expect(weeksCtrl.weeks).toEqual(defaultWeeks);
    }));

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
        spyOn(service, 'getWeek').and.returnValue(defaultWeeks[0]);
        spyOn(service, 'addTransaction').and.callFake(function(){return true});
        weekCtrl = $controller('WeekCtrl', {
            '$scope': scope2,
            '$routeParams': routeParams
        });
        weekCtrl.addTransaction(10);
        expect(service.addTransaction).toHaveBeenCalledWith(0, 10);
    }));

    // SERVICE
    it('should have Weeks Service', inject(function() {
        expect(service).toBeDefined();
    }));

    it('should return an array of weeks if none in local storage', inject(function(localStorageService) {
        spyOn(localStorageService, 'get').and.returnValue(null);
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
