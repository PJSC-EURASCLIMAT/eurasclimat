Ext.define('EC.CRM.controller.Main', {
    
    extend: 'App.controller.PortalAbstract',

    views: [
        'EC.CRM.view.Layout'
    ],
    
    init: function(container) {
        
        if (container.down('CRMPanel')) {
            container.down('CRMPanel').show();
            return;
        }
        container.add({
            xtype: 'CRMPanel',
            listeners: {
                show: function() {
                    var MC = this.getController('App.controller.Main');
                    MC.populateStaticMenu(this.getMenu());
                },
                scope: this
            }
        });
    },
    
    getMenu: function() {
        return [{
            text: 'CRM 1'
        }, {
            text: 'CRM 2'
        }];
    }
});