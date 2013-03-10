Ext.define('EC.CRM.controller.Methods', {
    
    extend: 'App.controller.PortalAbstract',

    views: [
        'EC.CRM.view.Methods.Layout'
    ],
    
    getMenu: function() {
        return [{
            text: 'Методики 1'
        }, {
            text: 'Методики 2'
        }];
    }
});