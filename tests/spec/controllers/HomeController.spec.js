define(['angularmocks'], function() {
  describe('HomeController', function() {
    var scope = {};
    beforeEach(function() {
      module('piQuadApp.controller');
      inject(function($controller) {
        $controller('HomeController', {
          $scope: scope
        });
      });
    });
   
    it('Testing HomeController', function() {
        expect(scope.app.appName).toBe('Angular Pi Quad');
    });
  });
});