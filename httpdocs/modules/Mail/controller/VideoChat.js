Ext.define('EC.Mail.controller.VideoChat', {
    
    extend: 'App.controller.PortalAbstract',

    views: [
        'EC.Mail.view.VideoChat.Layout'
    ],
    
    run: function(container) {
        this.getContainer(container);
    },
    
    getMenu: function() {
        return [{
            text: 'Видеочат 1'
        }, {
            text: 'Видеочат 2'
        }];
    }
});