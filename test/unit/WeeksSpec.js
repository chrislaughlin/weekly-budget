'use strict';


describe('Weeks Module', function () {

    var scope,
        controller,
        service,
        defaultWeeks = [{name: 'Week 1', total:200, transactions:[]}, {name: 'Week 2', total:200,transactions:[]},
            {name: 'Week 3', total:200, transactions:[]}, {name: 'Week 4', total:200, transactions:[]}];

    beforeEach(function () {
        module('weeklyBudget.weeks');
        module('LocalStorageModule');
    });

    beforeEach(inject(function ($rootScope, $controller, Weeks) {
        scope = $rootScope.$new();
        controller = $controller('WeeksCtrl', {
            '$scope': scope
        });
        service = Weeks;
    }));

    // CONTROLLER
    it('should have Weeks Controller', inject(function() {
        //spec body
        expect(controller).toBeDefined();
    }));

    it('should get weeks from service',inject(function() {
        spyOn(service, 'getWeeks').and.returnValue(defaultWeeks);
        expect(controller.weeks).toEqual(defaultWeeks);
    }))

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

});
