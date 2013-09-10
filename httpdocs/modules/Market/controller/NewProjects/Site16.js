Ext.define('EC.Market.controller.NewProjects.Site16', {

    extend: 'Ext.app.Controller',

    views: ['EC.Market.view.NewProjects.Site16'],
    
    run:function(container) {
        
        container.add(this.getView(this.views[0]).create());
            
    }
    
});