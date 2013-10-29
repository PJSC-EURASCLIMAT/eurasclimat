Ext.define('App.controller.Interface.CRM', {
    
    extend: 'App.controller.ChapterAbstract',

    views: ['App.view.Interface.CRM'],
    
    viewLayout: 'CRMPanel',
    
    init: function() {
        
        var container = this.getContainer();
        
        this.getController('App.controller.Interface.CRM.CurrentProjects').run(container);
        this.getController('App.controller.Interface.CRM.Development').run(container);
        
    },
    
    getMenu: function() {
        return [];
    }
});