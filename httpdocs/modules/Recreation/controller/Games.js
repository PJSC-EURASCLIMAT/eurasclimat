Ext.define('EC.Recreation.controller.Games', {
    
    extend: 'App.controller.PortalAbstract',

    views: [
        'EC.Recreation.view.Games.Layout'
    ],
    
    getMenu: function() {
        return [{
            text: 'Игры 1'
        }, {
            text: 'Игры 2'
        }];
    }
});