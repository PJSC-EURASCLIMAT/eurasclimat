Ext.define('EC.Main.controller.ForManufacturers', {
    
    extend: 'Ext.app.Controller',

    views: [
        'EC.Main.view.ForManufacturers',
        'EC.Main.view.ForManufacturersPortlet'
    ],
    
    init: function(container) {
        
        this.Container = container; 
        
        var panel;
        
        if ('portlet' == container.getXType()) {
            panel = container.add(this.getView('EC.Main.view.ForManufacturersPortlet').create());
            panel.down('button').on({
                click: this.openCard, 
                scope: this
            });
        } else {
            panel = container.add(this.getView('EC.Main.view.ForManufacturers').create());
        }
    },
    
    openCard: function(grid, record, item, index, e, eOpts) {
        
        var MC = this.getController('EC.Main.controller.Main'); 
        MC.openModuleTab(this.Container);
    }
    
});