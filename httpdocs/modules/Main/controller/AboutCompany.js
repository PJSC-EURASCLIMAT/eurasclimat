Ext.define('EC.Main.controller.AboutCompany', {
    
    extend: 'Ext.app.Controller',

    views: [
        'EC.Main.view.AboutCompany',
        'EC.Main.view.AboutCompanyPortlet'
    ],
    
    run: function(container) {
        
        this.Container = container; 
        
        var panel;
        
        if ('portlet' == container.getXType()) {
            panel = container.add(this.getView('EC.Main.view.AboutCompanyPortlet').create());
            panel.down('button').on({
                click: this.openCard, 
                scope: this
            });
        } else {
            panel = container.add(this.getView('EC.Main.view.AboutCompany').create());
        }
    },
    
    openCard: function(grid, record, item, index, e, eOpts) {
        
        var MC = this.getController('App.controller.Main'); 
        MC.openModuleTab(this.Container);
    }
    
});