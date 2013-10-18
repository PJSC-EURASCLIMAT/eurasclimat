Ext.define('EC.Orders.controller.Main', {
    
    extend: 'Ext.app.Controller',

    views: ['EC.Orders.view.Layout'],
    
    run: function(container) {
        
        this.Container = container; 
        var panel = container.add(this.getView('EC.Orders.view.Layout').create());
    }
    
});