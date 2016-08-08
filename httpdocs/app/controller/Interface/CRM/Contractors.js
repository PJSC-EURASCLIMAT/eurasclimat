Ext.define('App.controller.Interface.CRM.Contractors', {
    
    extend: 'App.controller.PortalAbstract',

    views: ['App.view.Interface.CRM.Contractors'],
    
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
        	text: 'Поставщики',
        	title: 'Поставщики',
        	icon: '/images/icons/about.png',
        	portletHeight: 305,
        	position: 'Contractors-column-1',
        	launchModule: 'EC.Contractors.controller.Contractors',
            handler: function(b) {
                MC.openModuleTab(b.initialConfig);
            }
        }];
    }
});