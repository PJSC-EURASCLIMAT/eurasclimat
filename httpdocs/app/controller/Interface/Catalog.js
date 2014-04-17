Ext.define('App.controller.Interface.Catalog', {
    
    extend: 'App.controller.ChapterAbstract',

    views: ['App.view.Interface.Catalog'],
    
    viewLayout: 'MainCatalogPanel',
    
    init: function() {
        
        var panel = this.getContainer();
        
        var MC = this.getController('App.controller.Main');
        
        panel.on('show', function() {
            MC.openModuleTab({
                text: 'КАТАЛОГ ТОВАРОВ',
                title: 'Каталог товаров',
                icon: '/images/icons/catalog.png',
                portletHeight: 400,
                launchModule: 'EC.Catalog.controller.Catalog'
            });
        }, this, {single: true});
    },
    
    getMenu: function() {
        
        var MC = this.getController('App.controller.Main');
        
        return [{
            text: 'КАТАЛОГ ТОВАРОВ',
            title: 'Каталог товаров',
            icon: '/images/icons/catalog.png',
            portletHeight: 400,
            launchModule: 'EC.Catalog.controller.Catalog',
            handler: function(b) {
                MC.openModulePortlet(b.initialConfig);
            }
        }];
    }
});