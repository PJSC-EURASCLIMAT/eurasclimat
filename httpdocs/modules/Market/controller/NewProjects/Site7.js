Ext.define('EC.Market.controller.NewProjects.Site7', {

    extend: 'Ext.app.Controller',

    views: ['EC.Market.view.NewProjects.Site7'],
    
    run:function(container) {
        
        container.add(this.getView(this.views[0]).create());
            
    }
    
});