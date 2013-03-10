Ext.define('EC.Mail.controller.Chat', {
    
    extend: 'App.controller.PortalAbstract',

    views: [
        'EC.Mail.view.Chat.Layout'
    ],
    
    getMenu: function() {
        return [{
            text: 'Чат 1'
        }, {
            text: 'Чат 2'
        }];
    }
});