Ext.define('EC.PA.controller.Main', {
    
    extend: 'App.controller.PortalAbstract',

    views: ['EC.PA.view.Layout'],
    
    init: function(container) {
        
        if (container.down('PAPanel')) {
            container.down('PAPanel').show();
            return;
        }
        this.mainPanel = container.add({xtype: 'PAPanel'});
        this.mainPanel.show();
       
        this.control({
            'PAPanel > toolbar button': {
                click: this.openModulePortlet,
                scope: this
            },
            'PAPanel portlet': {
                restore: this.openModuleTab,
                maximize: this.openModuleFullscreen,
                scope: this
            }
        });
    }
});