Ext.define('EC.Market.controller.Rating', {
    
    extend: 'App.controller.PortalAbstract',

    views: [
        'EC.Market.view.Rating.Layout'
    ],
    
    getMenu: function() {
        return [{
            text: 'Рейтинги 1'
        }, {
            text: 'Рейтинги 2'
        }];
    }
});