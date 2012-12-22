Ext.define('EC.Main.controller.News', {
    
    extend: 'Ext.app.Controller',

    views: ['EC.Main.view.News'],
    
    init: function(container) {
        
        container.add(this.getView('EC.Main.view.News').create());
    }
});