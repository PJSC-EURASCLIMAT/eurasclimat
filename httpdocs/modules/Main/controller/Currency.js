Ext.define('EC.Main.controller.Currency', {
    
    extend: 'Ext.app.Controller',

    stores: ['EC.Main.store.Currency'],
    
    models: ['EC.Main.model.Currency'],
    
    views: ['EC.Main.view.Currency'],
    
    init: function(container) {
        var panel = container.add(this.getView('EC.Main.view.Currency').create());
    }
});