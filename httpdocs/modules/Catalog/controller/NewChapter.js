Ext.define('EC.Catalog.controller.NewChapter', {
    
    extend: 'App.controller.PortalAbstract',

    views: [
        'EC.Catalog.view.NewChapterLayout'
    ],
    
    run: function(container) {
        this.getContainer(container);
    },
    
    getMenu: function() {
        return [{
            text: 'Меню подраздела 1'
        }, {
            text: 'Меню подраздела 2'
        }];
    }
});