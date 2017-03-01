// Register `CardTable` component, along with its associated controller and template
angular.module('kalookiApp').component('cardTable', {
    templateUrl: 'card-table/card-table.template.html',
    controller: function CardTableController() {
        this.pagetitle = 'Kalooki';
        this.introtext = 'Welcome to Kalooki Online';
    }
});
