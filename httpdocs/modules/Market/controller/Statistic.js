Ext.define('EC.Market.controller.Statistic', {
    
    extend: 'App.controller.PortalAbstract',

    views: [
        'EC.Market.view.Statistic.Layout'
    ],
    
    run: function(container) {
        this.getContainer(container);
    },
    
    getMenu: function() {
        return [{
            text: 'Статистич. выборки'
        }];
    }
});