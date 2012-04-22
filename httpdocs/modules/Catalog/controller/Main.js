Ext.define('EC.Catalog.controller.Main', {
    
    extend: 'Ext.app.Controller',
    
    stores: [
        'EC.Catalog.store.Conditioners'
    ],
    
    models: [
        'EC.Catalog.model.Conditioners'
    ],

    views: [
        'EC.Catalog.view.Layout',
        'EC.Catalog.view.ConditionersList',
        'EC.Catalog.view.Edit'
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
        
//        this.control({
//            'ConditionersList': {
//                itemdblclick: this.editItem
//            }
//        });
        
    },
    
    editItem: function(grid, record) {
        var view = Ext.widget('CatalogEdit');
        view.down('form').loadRecord(record);
    }
});