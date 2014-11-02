'use strict';


describe('Weeks Module', function () {

    var scope,
        controller,
        service;

    beforeEach(function () {
        module('weeklyBudget.weeks');
    });

    beforeEach(inject(function ($rootScope, $controller, Weeks) {
        scope = $rootScope.$new();
        controller = $controller('WeeksCtrl', {
            '$scope': scope
        });
        service = Weeks;
    }));


    it('should have Weeks Controller', inject(function() {
        //spec body
        expect(controller).toBeDefined();
    }));

    it('should have Weeks Service', inject(function() {
        expect(service).toBeDefined();
    }))

});
