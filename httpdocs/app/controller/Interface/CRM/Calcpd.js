Ext.define('App.controller.Interface.CRM.Calcpd', {
    
    extend: 'App.controller.PortalAbstract',

    views: ['App.view.Interface.CRM.Calcpd'],
    
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
        	text: 'Калькулятор ПИР',
        	title: 'Калькулятор ПИР',
        	icon: '/images/icons/about.png',
        	portletHeight: 305,
        	position: 'Calcpd-column-1',
        	launchModule: 'EC.CRM.controller.Calcpd.Main',
            handler: function(b) {
                MC.openModuleTab(b.initialConfig);
            }
        }];
    }
});