Ext.define('App.controller.Interface.GoodsServices', {
    
    extend: 'App.controller.ChapterAbstract',

    views: ['App.view.Interface.GoodsServices'],
    
    viewLayout: 'CatalogPanel',
    
    init: function() {
        
        var container = this.getContainer();
        
        this.getController('EC.Catalog.controller.GoodsCatalog').run(container);
    },
    
    getMenu: function() {
        return [];
    }
});