Ext.define('App.controller.Interface.CRM.About', {
    
    extend: 'App.controller.PortalAbstract',

    views: ['App.view.Interface.CRM.About'],

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
            text: 'О системе',
            title: 'О системе',
            icon: '/images/icons/about.png',
            portletHeight: 400,
            launchModule: 'EC.Main.controller.AboutSystem',
            handler: function(b) {
                MC.openModulePortlet(b.initialConfig);
            }
        }];
    }
});
