Ext.define('EC.Main.controller.MiniBrowser', {

    extend: 'Ext.app.Controller',

    views: ['EC.Main.view.About.MiniBrowser'],
    
    run: function(container) {
        
        container.add(this.getView(this.views[0]).create());
            
    }
    
});