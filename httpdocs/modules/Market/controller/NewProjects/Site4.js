Ext.define('EC.Market.controller.NewProjects.Site4', {

    extend: 'Ext.app.Controller',

    views: ['EC.Market.view.NewProjects.Site4'],
    
    run:function(container) {
        
        container.add(this.getView(this.views[0]).create());
            
    }
    
});