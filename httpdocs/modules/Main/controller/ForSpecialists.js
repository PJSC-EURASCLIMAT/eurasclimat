Ext.define('EC.Main.controller.ForSpecialists', {
    
    extend: 'Ext.app.Controller',

    views: [
        'EC.Main.view.ForSpecialists',
        'EC.Main.view.ForSpecialistsPortlet'
    ],
    
    run: function(container) {
        
        this.Container = container; 
        
        var panel;
        
        if ('portlet' == container.getXType()) {
            panel = container.add(this.getView('EC.Main.view.ForSpecialistsPortlet').create());
            panel.down('button').on({
                click: this.openCard, 
                scope: this
            });
        } else {
            panel = container.add(this.getView('EC.Main.view.ForSpecialists').create());
        }
    },
    
    openCard: function(grid, record, item, index, e, eOpts) {
        var MC = this.getController('App.controller.Main'); 
        MC.openModuleTab(this.Container);
    }
    
});