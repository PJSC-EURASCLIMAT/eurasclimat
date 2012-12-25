Ext.define('EC.Main.controller.Manufacturers', {
    
    extend: 'Ext.app.Controller',
    
    stores: [
        'EC.Main.store.Manufacturers'
    ],
    
    models: [
        'EC.Main.model.Manufacturers'
    ],

    views: [
        'EC.Main.view.Manufacturers'
    ],
    
    init: function(container) {

        container.setLoading('Загрузка...', true);
        
        var treepanel = container.add({
            xtype: 'ManufacturersList',
            preventHeader: true,
            border: false,
            listeners: {
                afterLayout: function() {
                    container.setLoading(false);
                }
            }
        });

        treepanel.getStore().load();
    }   
});