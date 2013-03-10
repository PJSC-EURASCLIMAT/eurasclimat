Ext.define('EC.Recreation.controller.Music', {
    
    extend: 'App.controller.PortalAbstract',

    views: [
        'EC.Recreation.view.Music.Layout'
    ],
    
    getMenu: function() {
        return [{
            text: 'Музыка 1'
        }, {
            text: 'Музыка 2'
        }];
    }
});