Ext.define('EC.Main.controller.News', {
    
    extend: 'Ext.app.Controller',

    stores: ['EC.Main.store.News'],
    
    models: ['EC.Main.model.News'],
    
    views: ['EC.Main.view.News'],
    
    init: function(container) {
        container.add(this.getView('EC.Main.view.News').create());
    }
});