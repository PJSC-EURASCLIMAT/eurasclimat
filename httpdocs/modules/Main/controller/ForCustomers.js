Ext.define('EC.Main.controller.ForCustomers', {
    
    extend: 'Ext.app.Controller',

    views: [
        'EC.Main.view.ForCustomers',
        'EC.Main.view.ForCustomersPortlet'
    ],
    
    run: function(container) {
        
        this.Container = container; 
        
        var panel;
        
        if ('portlet' == container.getXType()) {
            panel = container.add(this.getView('EC.Main.view.ForCustomersPortlet').create());
            panel.down('button').on({
                click: this.openCard, 
                scope: this
            });
        } else {
            panel = container.add(this.getView('EC.Main.view.ForCustomers').create());
        }
    },
    
    openCard: function(grid, record, item, index, e, eOpts) {
        
        var MC = this.getController('App.controller.Main'); 
        MC.openModuleTab(this.Container);
    }
    
});