Ext.define('EC.Market.controller.NewProjects.Site8', {

    extend: 'Ext.app.Controller',

    views: ['EC.Market.view.NewProjects.Site8'],
    
    run:function(container) {
        
        container.add(this.getView(this.views[0]).create());
            
    }
    
});