Ext.define('App.controller.Interface.CRM.Calcsmr', {
    
    extend: 'App.controller.PortalAbstract',

    views: ['App.view.Interface.CRM.Calcsmr'],
    
    run: function(container) {
        
    	this.getController('EC.CRM.controller.Calcsmr.Main').run(this.getContainer(container));
    	
    	/*
		var container = this.getContainer(container),
            MC = this.getController('App.controller.Main'),
            menu = this.getMenu();
            
       	container.on('activate', function() {
        	MC.openModuleTab(menu[0]);
		}, this, {single: true});
    	*/
    },
    
    getMenu: function() {
        
    	return [];
    	
    	/*
        var MC = this.getController('App.controller.Main');
        
        return [{
        	text: 'Калькулятор СМР',
        	title: 'Калькулятор СМР',
        	icon: '/images/icons/about.png',
        	portletHeight: 305,
        	position: 'Calcsmr-column-1',
        	launchModule: 'EC.CRM.controller.Calcsmr.Main',
            handler: function(b) {
                MC.openModuleTab(b.initialConfig);
            }
        }];
        */
    }
});