// Define the `kalooki` module
var kalooki = angular.module('kalookiApp', ['ui.sortable']);

// Define the `KalookiController` controller on the `kalooki` module
kalooki.controller('KalookiController', function KalookiController($scope, $http) {
    $scope.playername = 'SlooperKlooper';
    $scope.infotext = 'Welcome to Kalooki Online';

    // Local variables.
    $scope.gameid = null;
    $scope.hand = [];
    $scope.decksrc = 'images/cards/back1.png'; // TODO - change depending on which deck is active.
    $scope.discardsrc = null;
    $scope.playerid = 1; // TODO - multiplayer support.
    $scope.activeplayer = 1; // TODO - multiplayer support.

    // Enter discard card mode.
    $scope.discardmode = false;

    // TODO - global game update method.

    // Start a new game.
    $http.get('http://localhost:3000/api/game_start').then(function(response) {
        $scope.gameid = response.data.gameid;
        $scope.hand = response.data.hand;
        $scope.activeplayer = response.data.startingplayer;

        // Update infotext.
        $scope.infotext = 'Welcome to game ' + $scope.gameid + '!';
        if ($scope.playerid == $scope.activeplayer) {
            $scope.infotext += ' You have the first turn, choose a card to discard.';

            $scope.discardmode = true;
        }
    });

    // Discard this card.
    $scope.discardCard = function(card) {
        var params = {
            playerid: $scope.playerid,
            gameid: $scope.gameid,
            cardid: card._id
        };

        $http.delete('http://localhost:3000/api/discard_card', {params: params}).then(function(response) {
            $scope.hand = response.data.hand;
            $scope.discardsrc = card.src;
            $scope.discardmode = false;
        });
    };

    // Sorting hand logic.
    $scope.sortableOptions = {
        'ui-floating': true,
        axis: 'x',
        update: function(e, ui) {
            // TODO - save order.
        }
    };
});
