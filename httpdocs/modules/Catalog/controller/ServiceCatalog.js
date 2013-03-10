Ext.define('EC.Catalog.controller.ServiceCatalog', {
    
    extend: 'App.controller.PortalAbstract',

    views: ['EC.Catalog.view.ServiceCatalogLayout'],
    
    getMenu: function() {
        return [{
            text: 'Каталог услуг 1'
        }, {
            text: 'Каталог услуг 2'
        }];
    }
});