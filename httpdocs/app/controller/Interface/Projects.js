Ext.define('App.controller.Interface.Projects', {
    
    extend: 'App.controller.ChapterAbstract',

    views: ['App.view.Interface.Projects'],
    
    viewLayout: 'ProjectsPanel',
    
    init: function() {
    	
    	//this.getController('EC.CRM.controller.Projects.Projects').run(this.getContainer());
        
		var panel = this.getContainer();
	    
	    var MC = this.getController('App.controller.Main');
	    
	    panel.on('show', function() {
	        MC.openModuleTab({
	            text: 'Заказы-проекты',
	            title: 'Заказы-проекты',
	            icon: '/images/icons/catalog.png',
	            minimizable: false,
	            maximizable: false,
	            closable: false,
	            launchModule: 'EC.CRM.controller.Projects.Projects'
	        });
	    }, this, {single: true});
    },
    
    getMenu: function() {
    	
    	return [];

    	/*
    	var MC = this.getController('App.controller.Main');
        
        return [{
            text: 'ПРОЕКТЫ',
            title: 'Проекты',
            icon: '/images/icons/catalog.png',
            portletHeight: 400,
            position: 'OrdersPanel-column-3',
            launchModule: 'EC.CRM.controller.Projects.Projects',
            helpURL: '/html/crm/projects/help',
            handler: function(b) {
                MC.openModulePortlet(b.initialConfig);
            }
        }];
        */
    }
});