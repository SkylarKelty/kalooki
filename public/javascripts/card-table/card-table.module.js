// Register `CardTable` component, along with its associated controller and template
angular.module('kalookiApp').component('cardTable', {
    templateUrl: 'javascripts/card-table/card-table.template.html',
    controller: function CardTableController($http) {
        var self = this;

        self.infotext = 'Welcome to Kalooki Online';

        // Local variables.
        self.gameid = null;
        self.hand = [];
        self.decksrc = 'images/cards/back1.png'; // TODO - change depending on which deck is active.
        self.discardsrc = null;
        self.playerid = 1; // TODO - multiplayer support.
        self.activeplayer = 1; // TODO - multiplayer support.

        // Start a new game.
        $http.get('http://localhost:3000/api/game_start').then(function(response) {
            console.log(response.data)
            self.gameid = response.data.gameid;
            self.hand = response.data.hand;
            self.activeplayer = response.data.startingplayer;

            // Update infotext.
            self.infotext = 'Welcome to game ' + self.gameid + '!';
            if (self.playerid == self.activeplayer) {
                self.infotext += ' You have the first turn, choose a card to discard.';

                // TODO - discard logic.
            }
        });

        // Sorting hand logic.
        // TODO - save order.
        self.sortableOptions = {
            'ui-floating': true,
            axis: 'x',
            update: function(e, ui) {
                var logEntry = {
                    ID: self.sortingLog.length + 1,
                    Text: 'Moved element: ' + ui.item.scope().item.src
                };
                console.log(logEntry);
            }
        };

        self.updateHandOrder = function(fromIdx, toIdx) {
            console.log(hand);
        };
    }
});
