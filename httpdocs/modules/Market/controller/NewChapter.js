Ext.define('EC.Market.controller.NewChapter', {
    
    extend: 'App.controller.PortalAbstract',

    views: [
        'EC.Market.view.NewChapter.Layout'
    ],
    
    getMenu: function() {
        return [{
            text: 'Меню подраздела 1'
        }, {
            text: 'Меню подраздела 2'
        }];
    }
});