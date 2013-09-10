Ext.define('EC.Market.controller.NewProjects.Site10', {

    extend: 'Ext.app.Controller',

    views: ['EC.Market.view.NewProjects.Site10'],
    
    run:function(container) {
        
        container.add(this.getView(this.views[0]).create());
            
    }
    
});