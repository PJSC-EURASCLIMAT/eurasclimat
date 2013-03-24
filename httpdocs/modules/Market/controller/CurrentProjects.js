Ext.define('EC.Market.controller.CurrentProjects', {
    
    extend: 'App.controller.PortalAbstract',

    views: [
        'EC.Market.view.CurrentProjects.Layout'
    ],
    
    run: function(container) {
        this.getContainer(container);
    },
    
    getMenu: function() {
        return [{
            text: 'Проекты в работе 1'
        }, {
            text: 'Проекты в работе 2'
        }];
    }
});