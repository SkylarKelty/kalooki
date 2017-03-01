// Define the `kalooki` module
var kalooki = angular.module('kalooki', []);

// Define the `KalookiController` controller on the `kalooki` module
kalooki.controller('KalookiController', function KalookiController($scope) {
  $scope.pagetitle = 'Kalooki';
  $scope.introtext = 'Welcome to Kalooki Online';
  $scope.phones = [
    {
      name: 'Nexus S',
      snippet: 'Fast just got faster with Nexus S.'
    }, {
      name: 'Motorola XOOM™ with Wi-Fi',
      snippet: 'The Next, Next Generation tablet.'
    }, {
      name: 'MOTOROLA XOOM™',
      snippet: 'The Next, Next Generation tablet.'
    }
  ];
});
