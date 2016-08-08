Ext.define('App.controller.Interface.CRM.Development', {
    
    extend: 'App.controller.PortalAbstract',

    views: ['App.view.Interface.CRM.Development'],
    
    run: function(container) {
        
    	this.getController('EC.SysDev.controller.Main').run(this.getContainer(container));
    	
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
            title: 'Разработка проектов',
            text: 'Разработка проектов',
            icon: '/images/icons/projects.png',
            launchModule: 'EC.SysDev.controller.Main',
            handler: function(b) {
                MC.openModuleTab(b.initialConfig);
            }
        }];
        */
    }
});