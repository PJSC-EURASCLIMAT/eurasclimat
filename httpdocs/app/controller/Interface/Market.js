Ext.define('App.controller.Interface.Market', {
    
    extend: 'App.controller.ChapterAbstract',

    views: ['App.view.Interface.Market'],
    
    viewLayout: 'MarketPanel',

    init: function() {
        
        var container = this.getContainer();
        
        this.getController('App.controller.Interface.Market.Partners').run(container);
    },
    
    getMenu: function() {
        return [];
    }
});