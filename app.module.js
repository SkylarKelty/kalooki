// Define the `kalooki` module
var kalooki = angular.module('kalookiApp', ['ui.sortable']);

// Define the `KalookiController` controller on the `kalooki` module
kalooki.controller('KalookiController', function KalookiController($scope) {
    $scope.playername = '';
});

kalooki.buildExampleCardArray = function(size) {
    var numbers = ['a',2,3,4,5,6,7,8,9,10,'j','q','k'];
    var types = ['c','s','h','d'];
    var i, array = [];
    for (i = 1; i <= size; i++) {
        var number = numbers[Math.floor(Math.random() * numbers.length)];
        var cardtype = types[Math.floor(Math.random() * types.length)];

        array.push({
          src: 'media/images/cards/' + number + cardtype + '.png',
          name: name,
          type: cardtype
        });
    }

    return array;
};
