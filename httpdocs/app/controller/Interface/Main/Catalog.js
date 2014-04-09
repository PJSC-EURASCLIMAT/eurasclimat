Ext.define('App.controller.Interface.Main.Catalog', {
    
    extend: 'App.controller.PortalAbstract',

    views: ['App.view.Interface.Main.Catalog'],
    
    run: function(container) {
        
        var panel = this.getContainer(container);
        
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