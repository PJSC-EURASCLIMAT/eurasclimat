Ext.define('EC.Mail.controller.VideoChat', {
    
    extend: 'App.controller.PortalAbstract',

    views: [
        'EC.Mail.view.VideoChat.Layout'
    ],
    
    getMenu: function() {
        return [{
            text: 'Видеочат 1'
        }, {
            text: 'Видеочат 2'
        }];
    }
});