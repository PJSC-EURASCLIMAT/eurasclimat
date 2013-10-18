Ext.define('App.controller.Interface.Main.Orders', {
    
    extend: 'App.controller.PortalAbstract',

    views: ['App.view.Interface.Main.Orders'],
    
    run: function(container) {
        
        var container = this.getContainer(container),
            MC = this.getController('App.controller.Main'),
            menu = this.getMenu();
            
       container.on('show', function() {
            MC.openModuleTab(menu[0]);
       }, this, {single: true});
       
    },
    
    getMenu: function() {
        
        var MC = this.getController('App.controller.Main');
        
        return [{
            title: 'Единое окно',
            text: 'Единое окно',
            icon: '/images/icons/projects.png',
            launchModule: 'EC.Orders.controller.Main',
            handler: function(b) {
                MC.openModuleTab(b.initialConfig);
            }
        }];
    }
});
