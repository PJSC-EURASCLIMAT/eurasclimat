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
        this.mainPanel = container.add({xtype: 'CRMPanel'});
        this.mainPanel.show();
       
        this.control({
            'CRMPanel portlet': {
                restore: this.openModuleTab,
                maximize: this.openModuleFullscreen,
                scope: this
            }
        });
    }
});