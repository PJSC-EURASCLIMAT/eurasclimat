Ext.define('EC.Specialists.controller.SpecialistsCatalog', {
    
    extend: 'App.controller.PortalAbstract',

    views: [
        'EC.Specialists.view.SpecialistsCatalog.Layout'
    ],
    
    run: function(container) {
        this.getContainer(container);
    },
    
    getMenu: function() {
        return [{
            text: 'Каталог специалистов 1'
        }, {
            text: 'Каталог специалистов 2'
        }];
    }
});