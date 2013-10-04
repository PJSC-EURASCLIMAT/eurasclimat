Ext.define('App.controller.Interface.Manufacturers', {
    
    extend: 'App.controller.ChapterAbstract',

    views: ['App.view.Interface.Manufacturers'],
    
    viewLayout: 'ManufacturersPanel',
    
    init: function() {
        
        var container = this.getContainer();
        this.getController('App.controller.Interface.Manufacturers.Partners').run(container);
    },
    
    getMenu: function() {
        return [];
    }
});