Ext.define('EC.Main.controller.NewsSubChapter', {
    
    extend: 'App.controller.PortalAbstract',

    views: ['EC.Main.view.NewsSubChapter.Layout'],
    
    run: function(container) {
        this.getContainer(container);
    },
    
    getMenu: function() {
        return [{
            text: 'Новости 1'
        }, {
            text: 'Новости 2'
        }];
    }
});