Ext.define('App.controller.Interface.GoodsServices', {
    
    extend: 'App.controller.ChapterAbstract',

    views: ['App.view.Interface.GoodsServices'],
    
    viewLayout: 'CatalogPanel',
    
    init: function() {
        
        var container = this.getContainer();
        
        this.getController('App.controller.Interface.GoodsServices.Catalogs').run(container);
    },
    
    getMenu: function() {
        return [];
    }
});