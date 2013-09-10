Ext.define('EC.Market.controller.NewProjects.Site14', {

    extend: 'Ext.app.Controller',

    views: ['EC.Market.view.NewProjects.Site14'],
    
    run:function(container) {
        
        container.add(this.getView(this.views[0]).create());
            
    }
    
});