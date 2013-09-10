Ext.define('EC.Market.controller.NewProjects.Site9', {

    extend: 'Ext.app.Controller',

    views: ['EC.Market.view.NewProjects.Site9'],
    
    run:function(container) {
        
        container.add(this.getView(this.views[0]).create());
            
    }
    
});