Ext.define('EC.Market.controller.Main', {
    
    extend: 'App.controller.ChapterAbstract',

    views: [
        'EC.Market.view.Layout'
    ],
    
    viewLayout: 'MarketPanel',
    
    getMenu: function() {
        return [{
            text: 'Торговая площадка 1'
        }, {
            text: 'Торговая площадка 2'
        }];
    }
});