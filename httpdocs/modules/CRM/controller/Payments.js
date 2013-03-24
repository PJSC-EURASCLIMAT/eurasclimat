Ext.define('EC.CRM.controller.Payments', {
    
    extend: 'App.controller.PortalAbstract',

    views: [
        'EC.CRM.view.Payments.Layout'
    ],
    
    run: function(container) {
        this.getContainer(container);
    },
    
    getMenu: function() {
        return [{
            text: 'Платежи 1'
        }, {
            text: 'Платежи 2'
        }];
    }
});