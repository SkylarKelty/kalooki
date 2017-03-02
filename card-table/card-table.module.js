// Register `CardTable` component, along with its associated controller and template
angular.module('kalookiApp').component('cardTable', {
    templateUrl: 'card-table/card-table.template.html',
    controller: function CardTableController($scope) {
        this.pagetitle = 'Kalooki';
        this.introtext = 'Welcome to Kalooki Online';
        this.activecard = 'media/images/cards/2c.png'
        this.hand = kalooki.buildExampleCardArray(14);

        this.sortingLog = [];

        this.sortableOptions = {
            'ui-floating': true,
            axis: 'x',
            stop: function(e, ui) {
                var logEntry = {
                    ID: this.sortingLog.length + 1,
                    Text: 'Moved element: ' + ui.item.scope().item.src
                };
                this.sortingLog.push(logEntry);
            }
        };
    }
});
