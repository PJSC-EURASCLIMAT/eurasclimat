Ext.define('EC.Mail.controller.CorpBaseNet', {
    
    extend: 'App.controller.PortalAbstract',

    views: [
        'EC.Mail.view.CorpBaseNet.Layout'
    ],
    
    getMenu: function() {
        return [{
            text: 'Корп. стационарная связь 1'
        }, {
            text: 'Корп. стационарная связь 2'
        }];
    }
});