Ext.define('App.controller.Interface.Manufacturers.Partners', {
    
    extend: 'App.controller.PortalAbstract',

    views: ['App.view.Interface.Manufacturers.Partners'],
    
    modules: [{
        title: 'Производители оборудования',
        icon: '/images/icons/about.png',
        position: 'Manufacturers-Trade-column-1',
        allowMultiple: false,
        launchModule: 'EC.Manufacturers.controller.SiteView'
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