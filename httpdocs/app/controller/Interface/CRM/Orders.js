Ext.define('App.controller.Interface.CRM.Orders', {
    
    extend: 'App.controller.PortalAbstract',

    views: ['App.view.Interface.CRM.Orders'],
    
    run: function(container) {
        
        var container = this.getContainer(container),
            MC = this.getController('App.controller.Main'),
            menu = this.getMenu();
            
       container.on('activate', function() {
            MC.openModuleTab(menu[0]);
       }, this, {single: true});
       
    },
    
    getMenu: function() {
        
        var MC = this.getController('App.controller.Main');
        
        return [{
            text: 'ПРОЕКТЫ',
            title: 'Проекты',
            icon: '/images/icons/catalog.png',
            portletHeight: 400,
            position: 'OrdersPanel-column-3',
            launchModule: 'EC.CRM.controller.Projects.Projects',
            helpURL: '/html/crm/projects/help',
            handler: function(b) {
                MC.openModulePortlet(b.initialConfig);
            }
        }];
    }
});
