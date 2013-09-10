Ext.define('EC.Market.controller.NewProjects.Site15', {

    extend: 'Ext.app.Controller',

    views: ['EC.Market.view.NewProjects.Site15'],
    
    run:function(container) {
        
        container.add(this.getView(this.views[0]).create());
            
    }
    
});