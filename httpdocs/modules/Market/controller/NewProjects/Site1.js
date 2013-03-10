Ext.define('EC.Market.controller.NewProjects.Site1', {

    extend: 'Ext.app.Controller',

    views: ['EC.Market.view.NewProjects.Site1'],
    
    init: function(container) {
        
        container.add(this.getView(this.views[0]).create());
            
    }
    
});