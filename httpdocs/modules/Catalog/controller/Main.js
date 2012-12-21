Ext.define('EC.Catalog.controller.Main', {
    
    extend: 'App.controller.PortalAbstract',

    init: function(container) {
        
        if (container.down('CatalogPanel')) {
            container.down('CatalogPanel').show();
            return;
        }
        
        this.mainPanel = container.add({xtype: 'CatalogPanel'});
        this.mainPanel.show();
        
        this.control({
            'CatalogPanel > toolbar button': {
                click: this.openModulePortlet,
                scope: this
            },
            'CatalogPanel portlet': {
                restore: this.openModuleTab,
                maximize: this.openModuleFullscreen,
                scope: this
            }
        });
    }
});