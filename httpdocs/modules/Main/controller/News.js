Ext.define('EC.Main.controller.News', {
    
    extend: 'Ext.app.Controller',

    stores: ['EC.Main.store.News'],
    
    models: ['EC.Main.model.News'],
    
    views: ['EC.Main.view.News'],
    
    init: function(container) {
        
        var grid = container.add(this.getView('EC.Main.view.News').create());
        
        grid.on('itemclick', this.openNewsCard, this);
    },
    
    openNewsCard: function(grid, record, item, index, e, eOpts) {
        var link = e.target.attributes; 
        if (link.action && link.action.value == 'readmore') {
            var MC = this.getController('EC.Main.controller.Main'); 
            MC.openModuleTab({
                launchModule: 'EC.Main.controller.NewsCard',
                title: record.get('title'),
                icon: '/images/icons/news_current.png'
            });
            
            MC.getStore('EC.Main.store.NewsCard').load({params: {id: link.newsid.value}});
        }
    }
});