Ext.define('App.controller.Interface.CRM', {
    
    extend: 'App.controller.ChapterAbstract',

    views: ['App.view.Interface.CRM'],
    
    viewLayout: 'CRMPanel',
    
    init: function() {
        
        var container = this.getContainer();
        
        this.getController('App.controller.Interface.CRM.Orders').run(container);
        this.getController('App.controller.Interface.CRM.Development').run(container);
        if (acl.isView('experts')) {
            this.getController('App.controller.Interface.CRM.Experts').run(container);
        }
        this.getController('App.controller.Interface.CRM.MiniBrowser').run(container);
        this.getController('App.controller.Interface.CRM.About').run(container);
        this.getController('App.controller.Interface.CRM.Calc').run(container);
        
    },
    
    getMenu: function() {
        return [];
    }
});