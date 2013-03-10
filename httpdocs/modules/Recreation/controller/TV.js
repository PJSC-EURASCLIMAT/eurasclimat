Ext.define('EC.Recreation.controller.TV', {
    
    extend: 'App.controller.PortalAbstract',

    views: [
        'EC.Recreation.view.TV.Layout'
    ],
    
    getMenu: function() {
        return [{
            text: 'ТВ 1'
        }, {
            text: 'ТВ 2'
        }];
    }
});