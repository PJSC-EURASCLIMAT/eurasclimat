Ext.define('EC.Market.controller.NewProjects.MiniBrowser', {

    extend: 'Ext.app.Controller',

    views: ['EC.Market.view.NewProjects.MiniBrowser'],
    
    run:function(container) {
        
        container.add(this.getView(this.views[0]).create());
            
    }
    
});