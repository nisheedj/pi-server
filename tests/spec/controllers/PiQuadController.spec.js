define(['socketio'], function(io) {
  describe('PiQuadController', function() {
    var scope = {};
    beforeEach(function() {
      module('piQuadApp.controller');
      inject(function($controller) {
        $controller('PiQuadController', {
          $scope: scope
        });
      });
    });
    it('Should initialize the socket', function() {
      expect(scope.socket.constructor.name).toBe('Socket');
    });
  });
});