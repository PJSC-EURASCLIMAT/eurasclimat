Ext.define('EC.Main.controller.NewsSubChapter', {
    
    extend: 'App.controller.PortalAbstract',

    views: ['EC.Main.view.NewsSubChapter.Layout'],
    
    getMenu: function() {
        return [{
            text: 'Новости 1'
        }, {
            text: 'Новости 2'
        }];
    }
});