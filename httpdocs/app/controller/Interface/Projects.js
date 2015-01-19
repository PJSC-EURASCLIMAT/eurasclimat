Ext.define('App.controller.Interface.Projects', {
    
    extend: 'App.controller.ChapterAbstract',

    views: ['App.view.Interface.Projects'],
    
    viewLayout: 'ProjectsPanel',
    
    init: function() {
        
		var panel = this.getContainer();
	    
	    var MC = this.getController('App.controller.Main');
	    
	    panel.on('show', function() {
	        MC.openModuleTab({
	            text: 'Заказы-проекты',
	            title: 'Заказы-проекты',
	            icon: '/images/icons/catalog.png',
	            launchModule: 'EC.CRM.controller.Projects.Projects'
	        });
	    }, this, {single: true});
    },
    
    getMenu: function() {

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
    }
});