Ext.define('EC.Main.controller.Competitions', {
    
    extend: 'App.controller.PortalAbstract',

    views: ['EC.Main.view.Competitions.Layout'],
    
    run: function(container) {
        this.getContainer(container);
    },
    
    getMenu: function() {
        return [{
            text: 'Конкурсы 1'
        }, {
            text: 'Конкурсы 2'
        }];
    }
});