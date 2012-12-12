Ext.define('EC.Admin.controller.Main', {
    
    extend: 'App.controller.PortalAbstract',

    views: ['EC.Admin.view.Layout'],
    
    init: function(container) {
        
        if (container.down('AdminPanel')) {
            return;
        }
        this.mainPanel = container.add({xtype: 'AdminPanel'});
        this.mainPanel.show();
        
        this.control({
            'AdminPanel > toolbar button': {
                click: this.openModulePortlet,
                scope: this
            },
            'AdminPanel portlet': {
                restore: this.openModuleTab,
                maximize: this.openModuleFullscreen,
                scope: this
            }
        });
    }
});