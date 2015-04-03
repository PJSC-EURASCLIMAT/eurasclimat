Ext.define('App.controller.Interface.Manufacturers', {
    
    extend: 'App.controller.ChapterAbstract',

    views: ['App.view.Interface.Manufacturers'],
    
    viewLayout: 'ManufacturersPanel',
    
    /*
    modules: [{
        title: 'Производители оборудования',
        icon: '/images/icons/about.png',
        allowMultiple: false,
        launchModule: 'EC.Manufacturers.controller.SiteView'
    }],
    */
    
    init: function() {
        
    	this.getController('EC.Manufacturers.controller.SiteView').run(this.getContainer());
    	
    	/*
        var container = this.getContainer();
        
        var MC = this.getController('App.controller.Main');

        container.on('show', function() {
            MC.openModuleTab(this.modules[0]);
        }, this, {single: true});
        */
    },
    
    getMenu: function() {
        
    	return [];
    	
    	/*
        var MC = this.getController('App.controller.Main');
        
        Ext.each(this.modules, function(item) {
            item.text = item.title;
            item.handler = function(b) {
                MC.openModulePortlet(b.initialConfig);
            }
        });
        
        return this.modules;
        */
    }
});