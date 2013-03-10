Ext.define('EC.Main.controller.Development', {
    
    extend: 'App.controller.PortalAbstract',

    views: ['EC.Main.view.Development.Layout'],
    
    getMenu: function() {
        return [{
            text: 'Разработка системы 1'
        }, {
            text: 'Разработка системы 2'
        }];
    }
});