Ext.define('EC.Market.controller.NewProjects.Site13', {

    extend: 'Ext.app.Controller',

    views: ['EC.Market.view.NewProjects.Site13'],
    
    run:function(container) {
        
        container.add(this.getView(this.views[0]).create());
            
    }
    
});