Ext.define('EC.Main.controller.Projects', {
    
    extend: 'App.controller.PortalAbstract',

    views: ['EC.Main.view.Projects.Layout'],
    
    getMenu: function() {
        return [{
            text: 'Проекты 1'
        }, {
            text: 'Проекты 2'
        }];
    }
});