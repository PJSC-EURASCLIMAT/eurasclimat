Ext.define('EC.Main.controller.Projects', {
    
    extend: 'App.controller.PortalAbstract',

    views: ['EC.Main.view.Projects.Layout'],
    
    run: function(container) {
        this.getContainer(container);
    },
    
    getMenu: function() {
        return [{
            text: 'Статистика ПП'
        }, {
            text: 'Рейтинги ПП'
        }, {
            text: 'Участие в ПП'
        }, {    
            text: 'Архив ПП'
        }];
    }
});