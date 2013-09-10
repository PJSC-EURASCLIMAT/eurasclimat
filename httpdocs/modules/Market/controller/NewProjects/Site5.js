Ext.define('EC.Market.controller.NewProjects.Site5', {

    extend: 'Ext.app.Controller',

    views: ['EC.Market.view.NewProjects.Site5'],
    
    run:function(container) {
        
        container.add(this.getView(this.views[0]).create());
            
    }
    
});