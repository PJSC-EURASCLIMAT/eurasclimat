Ext.define('EC.Market.controller.NewProjects.Site11', {

    extend: 'Ext.app.Controller',

    views: ['EC.Market.view.NewProjects.Site11'],
    
    run:function(container) {
        
        container.add(this.getView(this.views[0]).create());
            
    }
    
});