Ext.define('EC.Catalog.controller.Main', {
    
    extend: 'App.controller.ChapterAbstract',

    views: ['EC.Catalog.view.Layout'],
    
    viewLayout: 'CatalogPanel',
    
    init: function(container) {
        
        var container = this.callParent(arguments);
        
        this.getController('EC.Catalog.controller.GoodsCatalog').init(container);
        this.getController('EC.Catalog.controller.ServiceCatalog').init(container);
        this.getController('EC.Catalog.controller.VendorCatalog').init(container);
        this.getController('EC.Catalog.controller.NewChapter').init(container);
    },
    
    getMenu: function() {
        return [{
            text: 'Каталоги 1'
        }, {
            text: 'Каталоги 2'
        }];
    }
});