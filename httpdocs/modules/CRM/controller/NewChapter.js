Ext.define('EC.CRM.controller.NewChapter', {
    
    extend: 'App.controller.PortalAbstract',

    views: [
        'EC.CRM.view.NewChapter.Layout'
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