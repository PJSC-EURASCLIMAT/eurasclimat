Ext.define('EC.Main.controller.About', {
    
    extend: 'App.controller.PortalAbstract',

    views: ['EC.Main.view.About'],
    
    init: function(container) {
        
        container.add(this.getView('EC.Main.view.About').create());
    }
});