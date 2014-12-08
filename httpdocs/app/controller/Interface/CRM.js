Ext.define('App.controller.Interface.CRM', {
    
    extend: 'App.controller.ChapterAbstract',

    views: ['App.view.Interface.CRM'],
    
    viewLayout: 'CRMPanel',
    
    init: function() {
        
        var container = this.getContainer();

        this.getController('App.controller.Interface.CRM.Orders').run(container);
        this.getController('App.controller.Interface.CRM.Calcsmr').run(container);
        this.getController('App.controller.Interface.CRM.Calcpd').run(container);
        this.getController('App.controller.Interface.CRM.Development').run(container);
        this.getController('App.controller.Interface.CRM.Contractors').run(container);
        if (acl.isView('experts')) {
            this.getController('App.controller.Interface.CRM.Experts').run(container);
        }
        this.getController('App.controller.Interface.CRM.Catalogs').run(container);

        this.getController('App.controller.Interface.CRM.MiniBrowser').run(container);
        this.getController('App.controller.Interface.CRM.Info').run(container);
    },
    
    getMenu: function() {
        return [];
    }
});