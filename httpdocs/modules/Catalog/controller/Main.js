Ext.define('EC.Catalog.controller.Main', {
    
    extend: 'Ext.app.Controller',

    views: [
        'EC.Catalog.view.Layout',
        'EC.Catalog.view.List',
        'EC.Catalog.view.Edit'
    ],
    
    stores: [
        'EC.Catalog.store.ListStore'
    ],
    
    models: [
        'EC.Catalog.model.ListModel'
    ],
    
    init: function() {
        
        var container = this.application.getController('Main').getCenterPanel();
        
        container.add({
            xtype: 'CatalogLayout',
            listeners: {
                afterLayout: function() {
                    container.setLoading(false);
                }
            }
        }).show();
        
        this.control({
            'CatalogList': {
                itemdblclick: this.editItem
            }
        });
        
    },
    
    editItem: function(grid, record) {
        var view = Ext.widget('CatalogEdit');
        view.down('form').loadRecord(record);
    }
});