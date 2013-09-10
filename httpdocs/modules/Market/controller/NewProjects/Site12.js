Ext.define('EC.Market.controller.NewProjects.Site12', {

    extend: 'Ext.app.Controller',

    views: ['EC.Market.view.NewProjects.Site12'],
    
    run:function(container) {
        
        container.add(this.getView(this.views[0]).create());
            
    }
    
});