Ext.define('EC.Main.controller.News', {
    
    extend: 'Ext.app.Controller',

    stores: ['EC.Main.store.News'],
    
    models: ['EC.Main.model.News'],
    
    views: ['EC.Main.view.News'],
    
    init: function(container) {
        
        var grid = container.add(this.getView('EC.Main.view.News').create());
        
        grid.on('itemclick', this.openCard, this);
    },
    
    openCard: function(grid, record, item, index, e, eOpts) {
        var link = e.target.attributes,
            MC = this.getController('EC.Main.controller.Main'); 

        if (!link.action) {
            return;
        }
        
        if (link.action.value == 'readmore') {
            MC.openModuleTab({
                title: record.get('title'),
                allowMultiple: true,
                icon: '/images/icons/news_current.png',
                launchModule: 'EC.Main.controller.NewsCard'
            });
            
            MC.getStore('EC.Main.store.NewsCard').load({params: {id: link.newsid.value}});
        }
        
        if (link.action.value == 'showperson') {
            MC.openModuleTab({
                title: 'Персональная информация',
                allowMultiple: true,
                icon: '/images/icons/worker.png',
                launchModule: 'EC.Main.controller.PersonCard'
            });
            
            MC.getStore('EC.Main.store.PersonCard').load({params: {id: link.personid.value}});
        }
    }
});