Ext.define('EC.Main.controller.Workers', {
    
    extend: 'Ext.app.Controller',
    
    stores: ['EC.Main.store.Workers'],
    
    models: ['EC.Main.model.Workers'],

    views: ['EC.Main.view.Workers'],
    
    run: function(container) {
        
        container.setLoading('Загрузка...', true);
        
        var gridpanel = container.add({
            xtype: 'WorkersList',
            preventHeader: true,
            border: false,
            listeners: {
                afterLayout: function() {
                    container.setLoading(false);
                }
            }
        });
        
        gridpanel.getStore().load();
    }
});