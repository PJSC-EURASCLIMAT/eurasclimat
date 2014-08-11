Ext.define('App.controller.Interface.CRM.Info', {
    
    extend: 'App.controller.PortalAbstract',

    views: ['App.view.Interface.CRM.Info'],

    run: function(container) {
        
        var container = this.getContainer(container),
            MC = this.getController('App.controller.Main'),
            menu = this.getMenu();
            
       container.on('activate', function() {
            Ext.each(menu, function(item) {
                MC.openModulePortlet(item);
            }, this);
       }, this, {single: true});
    },

    getMenu: function() {

        var MC = this.getController('App.controller.Main');
        
        return [{
            text: 'О системе',
            title: 'О системе',
            icon: '/images/icons/about.png',
            position: 'Info-column-1',
            portletHeight: 400,
            launchModule: 'EC.Main.controller.AboutSystem',
            handler: function(b) {
                MC.openModulePortlet(b.initialConfig);
            }
        }, {
            text: 'Проект "Курилка"',
            title: 'Проект "Курилка"',
            icon: '/images/icons/about.png',
            position: 'Info-column-2',
            portletHeight: 410,
            launchModule: 'EC.Main.controller.SmokerCabin',
            handler: function(b) {
                MC.openModulePortlet(b.initialConfig);
            }
        }];
    }
});
