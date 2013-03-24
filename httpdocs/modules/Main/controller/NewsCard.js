Ext.define('EC.Main.controller.NewsCard', {
    
    extend: 'Ext.app.Controller',

    stores: ['EC.Main.store.News.Card'],
    
    models: ['EC.Main.model.News.Card'],
    
    views: ['EC.Main.view.News.Card'],
    
    newsID: null,
    
    run: function(container) {
        container.add(this.getView('EC.Main.view.News.Card').create());
    }
});