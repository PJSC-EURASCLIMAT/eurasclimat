Ext.define('EC.CRM.controller.Payments', {
    
    extend: 'App.controller.PortalAbstract',

    views: [
        'EC.CRM.view.Payments.Layout'
    ],
    
    getMenu: function() {
        return [{
            text: 'Платежи 1'
        }, {
            text: 'Платежи 2'
        }];
    }
});