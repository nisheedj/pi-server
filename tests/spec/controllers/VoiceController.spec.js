define(['angularmocks'], function() {
  describe('VoiceController', function() {
    var scope = {};
    beforeEach(function() {
      module('piQuadApp.controller');
      inject(function($controller) {
        $controller('VoiceController', {
          $scope: scope
        });
      });
    });

    it('Testing title', function() {
      expect(scope.title).toBe('Pi Quad Voice Controls');
    });
  });
});