Ext.define('EC.Recreation.controller.NewChapter', {
    
    extend: 'App.controller.PortalAbstract',

    views: [
        'EC.Recreation.view.NewChapter.Layout'
    ],
    
    getMenu: function() {
        return [{
            text: 'Меню подраздела 1'
        }, {
            text: 'Меню подраздела 2'
        }];
    }
});