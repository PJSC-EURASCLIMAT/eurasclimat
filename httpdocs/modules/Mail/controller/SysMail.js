Ext.define('EC.Mail.controller.SysMail', {
    
    extend: 'App.controller.PortalAbstract',

    views: [
        'EC.Mail.view.SysMail.Layout'
    ],
    
    getMenu: function() {
        return [{
            text: 'Системная почта 1'
        }, {
            text: 'Системная почта 2'
        }];
    }
});