Ext.define('App.controller.Interface.Main.Development', {
    
    extend: 'App.controller.PortalAbstract',

    views: ['App.view.Interface.Main.Development'],
    
    run: function(container) {
        
        var container = this.getContainer(container),
            MC = this.getController('App.controller.Main'),
            menu = this.getMenu();
            
       container.on('show', function() {
            MC.openModulePortlet(menu[0]);
       }, this, {single: true});
       
    },
    
    getMenu: function() {
        
        var MC = this.getController('App.controller.Main');
        
        return [{
            title: 'Разработка системы',
            text: 'Разработка системы',
            icon: '/images/icons/projects.png',
            portletHeight: 410,
            position: 'MainPanel-development-column-1',
            launchModule: 'EC.Project.controller.Main',
            handler: function(b) {
                MC.openModulePortlet(b.initialConfig);
            }
        }];
    }
});
