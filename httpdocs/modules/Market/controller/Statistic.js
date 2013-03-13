Ext.define('EC.Market.controller.Statistic', {
    
    extend: 'App.controller.PortalAbstract',

    views: [
        'EC.Market.view.Statistic.Layout'
    ],
    
    getMenu: function() {
        return [{
            text: 'Статистич. выборки'
        }];
    }
});