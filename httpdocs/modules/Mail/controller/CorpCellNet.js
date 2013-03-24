Ext.define('EC.Mail.controller.CorpCellNet', {
    
    extend: 'App.controller.PortalAbstract',

    views: [
        'EC.Mail.view.CorpCellNet.Layout'
    ],
    
    run: function(container) {
        this.getContainer(container);
    },
    
    getMenu: function() {
        return [{
            text: 'Корп. сотовая связь 1'
        }, {
            text: 'Корп. сотовая связь 2'
        }];
    }
});