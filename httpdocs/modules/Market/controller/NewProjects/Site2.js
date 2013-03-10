Ext.define('EC.Market.controller.NewProjects.Site2', {

    extend: 'Ext.app.Controller',

    views: ['EC.Market.view.NewProjects.Site2'],
    
    init: function(container) {
        
        container.add(this.getView(this.views[0]).create());
            
    }
    
});