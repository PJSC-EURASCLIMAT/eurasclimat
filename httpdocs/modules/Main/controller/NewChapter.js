Ext.define('EC.Main.controller.NewChapter', {
    
    extend: 'App.controller.PortalAbstract',

    views: [
        'EC.Main.view.NewChapter.Layout'
    ],
    
    getMenu: function() {
        return [{
            text: 'Меню подраздела 1'
        }, {
            text: 'Меню подраздела 2'
        }];
    }
});