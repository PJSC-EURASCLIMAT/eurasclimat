Ext.define('EC.Market.controller.NewProjects.Site3', {

    extend: 'Ext.app.Controller',

    views: ['EC.Market.view.NewProjects.Site3'],
    
    init: function(container) {
        
        container.add(this.getView(this.views[0]).create());
            
    }
    
});