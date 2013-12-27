Ext.define('App.controller.Interface.CRM.Experts', {
    
    extend: 'App.controller.PortalAbstract',

    views: ['App.view.Interface.CRM.Experts'],

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
            text: 'Администрирование специалистов',
            title: 'Администрирование специалистов',
            icon: '/images/icons/about.png',
            portletHeight: 400,
            position: 'OrdersPanel-column-3',
            launchModule: 'EC.Experts.controller.Experts',
            handler: function(b) {
                MC.openModulePortlet(b.initialConfig);
            }
        }];
    }
});
