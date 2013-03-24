Ext.define('EC.Recreation.controller.Music', {
    
    extend: 'App.controller.PortalAbstract',

    views: [
        'EC.Recreation.view.Music.Layout'
    ],
    
    run: function(container) {
        this.getContainer(container);
    },
    
    getMenu: function() {
        return [{
            text: 'Музыка 1'
        }, {
            text: 'Музыка 2'
        }];
    }
});