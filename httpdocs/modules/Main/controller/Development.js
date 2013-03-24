Ext.define('EC.Main.controller.Development', {
    
    extend: 'App.controller.PortalAbstract',

    views: ['EC.Main.view.Development.Layout'],
    
    run: function(container) {
        this.getContainer(container);
    },
    
    getMenu: function() {
        return [{
            text: 'Статистика ПР'
        }, {
            text: 'Рейтинги ПР'
        }, {
            text: 'Участие в ПР'
        }, {    
            text: 'Архив ПР'
        }];
    }
});