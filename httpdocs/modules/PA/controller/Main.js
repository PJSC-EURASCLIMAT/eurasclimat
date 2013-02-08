Ext.define('EC.Pa.controller.Main', {
    
    extend: 'App.controller.PortalAbstract',

    views: ['EC.Pa.view.Layout'],
    
    init: function(container) {
        
        if (container.down('PaPanel')) {
            container.down('PaPanel').show();
            return;
        }
        this.mainPanel = container.add({xtype: 'PaPanel'});
        this.mainPanel.show();
       
        this.control({
            'PaPanel > toolbar button': {
                click: this.openModulePortlet,
                scope: this
            },
            'PaPanel portlet': {
                restore: this.openModuleTab,
                maximize: this.openModuleFullscreen,
                scope: this
            }
        });
    }
});