Ext.define('App.controller.Interface.CRM.Orders', {
    
    extend: 'App.controller.PortalAbstract',

    views: ['App.view.Interface.CRM.Orders'],
    
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
            text: 'ПРОЕКТЫ',
            title: 'Проекты',
            icon: '/images/icons/catalog.png',
            portletHeight: 400,
            position: 'OrdersPanel-column-3',
            launchModule: 'EC.CRM.controller.Projects',
            handler: function(b) {
                MC.openModulePortlet(b.initialConfig);
            }
//        }, {
//            title: 'Единое окно',
//            text: 'Единое окно',
//            icon: '/images/icons/projects.png',
//            launchModule: 'EC.Orders.controller.Main',
//            handler: function(b) {
//                MC.openModuleTab(b.initialConfig);
//            }
        }];
    }
});
