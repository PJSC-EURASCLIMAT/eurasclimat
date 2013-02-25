Ext.define('EC.Recreation.controller.Main', {
    
    extend: 'App.controller.PortalAbstract',

    views: [
        'EC.Recreation.view.Layout'
    ],
    
    init: function(container) {
        
        if (container.down('RecreationPanel')) {
            container.down('RecreationPanel').show();
            return;
        }
        this.mainPanel = container.add({xtype: 'RecreationPanel'});
        this.mainPanel.show();
       
        this.control({
            'RecreationPanel portlet': {
                restore: this.openModuleTab,
                maximize: this.openModuleFullscreen,
                scope: this
            }
        });
    }
});