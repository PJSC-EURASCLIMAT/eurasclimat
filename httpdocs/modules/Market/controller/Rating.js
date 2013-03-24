Ext.define('EC.Market.controller.Rating', {
    
    extend: 'App.controller.PortalAbstract',

    views: [
        'EC.Market.view.Rating.Layout'
    ],
    
    run: function(container) {
        this.getContainer(container);
    },
    
    getMenu: function() {
        return [{
            text: 'Выборки по рейтингам'
        }];
    }
});