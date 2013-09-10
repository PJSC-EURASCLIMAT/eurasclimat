Ext.define('EC.Market.controller.NewProjects.Site6', {

    extend: 'Ext.app.Controller',

    views: ['EC.Market.view.NewProjects.Site6'],
    
    run:function(container) {
        
        container.add(this.getView(this.views[0]).create());
            
    }
    
});