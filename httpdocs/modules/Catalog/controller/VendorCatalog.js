Ext.define('EC.Catalog.controller.VendorCatalog', {
    
    extend: 'App.controller.PortalAbstract',

    views: ['EC.Catalog.view.VendorCatalogLayout'],
    
    run: function(container) {
        this.getContainer(container);
    },
    
    getMenu: function() {
        return [{
            text: 'Производители 1'
        }, {
            text: 'Производители 2'
        }];
    }
});