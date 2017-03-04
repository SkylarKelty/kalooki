// Register `CardTable` component, along with its associated controller and template
angular.module('kalookiApp').component('cardTable', {
    templateUrl: 'javascripts/card-table/card-table.template.html',
    controller: function CardTableController($http) {
        var self = this;

        self.infotext = 'Welcome to Kalooki Online';

        // Build my hand.
        self.hand = [];
        $http.get('http://localhost:3000/api/game_start').then(function(response) {
            self.hand = response.data;
        });

        // Sorting.
        self.sortingLog = [];
        self.sortableOptions = {
            'ui-floating': true,
            axis: 'x',
            stop: function(e, ui) {
                var logEntry = {
                    ID: self.sortingLog.length + 1,
                    Text: 'Moved element: ' + ui.item.scope().item.src
                };
                self.sortingLog.push(logEntry);
            }
        };
    }
});
