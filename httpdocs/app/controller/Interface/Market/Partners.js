Ext.define('App.controller.Interface.Market.Partners', {
    
    extend: 'App.controller.PortalAbstract',

    views: ['App.view.Interface.Market.Partners'],
    
    modules: [{
        title: 'Тендеры',
        icon: '/images/icons/about.png',
        allowMultiple: true,
        launchModule: 'EC.Market.controller.SiteView'
    }],
    
    run: function(container) {
        
        this.getContainer(container);
        
        var MC = this.getController('App.controller.Main');

        container.on('show', function() {
            MC.openModuleTab(this.modules[0]);
        }, this, {single: true});
        
    },
    
    getMenu: function() {
        
        var MC = this.getController('App.controller.Main');
        
        Ext.each(this.modules, function(item) {
            item.text = item.title;
            item.handler = function(b) {
                MC.openModulePortlet(b.initialConfig);
            }
        });
        
        return this.modules;
    }
});