// Define the `kalooki` module
var kalooki = angular.module('kalookiApp', ['ui.sortable']);

// Define the `KalookiController` controller on the `kalooki` module
kalooki.controller('KalookiController', function KalookiController($scope) {
    $scope.playername = 'SlooperKlooper';
});
