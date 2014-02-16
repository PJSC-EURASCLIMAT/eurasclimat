Ext.define('App.controller.Interface.CRM.Calc', {
    
    extend: 'App.controller.PortalAbstract',

    views: ['App.view.Interface.CRM.Calc'],

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
            text: 'Калькулятор ПД',
            title: 'Калькулятор проектной документации',
            icon: '/images/icons/about.png',
            portletHeight: 400,
            position: 'Calc-column-1',
            launchModule: 'EC.CRM.controller.Calcpd.Main',
            handler: function(b) {
                MC.openModulePortlet(b.initialConfig);
            }
        }];
    }
});
