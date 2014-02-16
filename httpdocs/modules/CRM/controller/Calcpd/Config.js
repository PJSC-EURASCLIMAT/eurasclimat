Ext.define('EC.CRM.controller.Calcpd.Config', {
    
    extend: 'Ext.app.Controller',
    
    stores: [
        'EC.CRM.store.Calcpd.Serv'
    ],
    
    models: [
        'EC.CRM.model.Calcpd.ConfigAbstract'
    ],

    views: [
        'EC.CRM.view.Calcpd.ServList'
    ],
    
    run: function(container) {
        
        this.Container = Ext.create('EC.CRM.view.Calcpd.ConfigLayout');
        var servPanel = this.Container.down('#servPanel').add(Ext.create('EC.CRM.view.Calcpd.ServList'));
    }
});