define(['angularmocks'], function() {
  describe('HomeController', function() {
    var testScope = {};
    beforeEach(function() {
      module('piQuadApp.controller');
      inject(function($controller) {
        $controller('HomeController', {
          $scope: testScope
        });
      });
    });
   
    it('Testing HomeController', function() {
        expect(testScope.app.appName).toBe('Angular Pi Quad');
    });
  });
});