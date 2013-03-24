Ext.define('EC.Catalog.controller.ServiceCatalog', {
    
    extend: 'App.controller.PortalAbstract',

    views: ['EC.Catalog.view.ServiceCatalogLayout'],
    
    run: function(container) {
        this.getContainer(container);
    },
    
    getMenu: function() {
        return [{
            text: 'Производители'
        }];
    }
});