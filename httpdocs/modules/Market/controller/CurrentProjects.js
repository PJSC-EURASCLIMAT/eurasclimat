Ext.define('EC.Market.controller.CurrentProjects', {
    
    extend: 'App.controller.PortalAbstract',

    views: [
        'EC.Market.view.CurrentProjects.Layout'
    ],
    
    getMenu: function() {
        return [{
            text: 'Проекты в работе 1'
        }, {
            text: 'Проекты в работе 2'
        }];
    }
});