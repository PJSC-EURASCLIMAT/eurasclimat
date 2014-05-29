Ext.define('App.controller.Interface.CRM.Services', {

    extend: 'App.controller.PortalAbstract',

    views: ['App.view.Interface.CRM.Services'],

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
            text: 'Услуги',
            title: 'Услуги',
            icon: '/images/icons/catalog.png',
            portletHeight: 400,
//            position: 'ServicesPanel-column-3',
            position: 'MainPanel-services-column-1',
            launchModule: 'EC.Services.controller.Services',
            handler: function(b) {
                MC.openModulePortlet(b.initialConfig);
            }
        }];
    }
});