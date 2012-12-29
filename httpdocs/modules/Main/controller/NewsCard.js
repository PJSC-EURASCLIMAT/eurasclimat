Ext.define('EC.Main.controller.NewsCard', {
    
    extend: 'Ext.app.Controller',

    stores: ['EC.Main.store.NewsCard'],
    
    models: ['EC.Main.model.NewsCard'],
    
    views: ['EC.Main.view.NewsCard'],
    
    newsID: null,
    
    init: function(container) {
        container.add(this.getView('EC.Main.view.NewsCard').create());
    }
});