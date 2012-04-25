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
        
        var container = this.application.getController('Main').getCenterPanel(),
            tab = container.child('CatalogLayout');
        
        if (!tab) {
            container.add({
                xtype: 'CatalogLayout',
                listeners: {
                    afterLayout: function() {
                        container.setLoading(false);
                    }
                }
            }).show();
        } else {
            tab.show();
            container.setLoading(false);
        }
        
//        this.control({
//            'ConditionersList > panel': {
//                collapse: function(panel) {
//                    panel.up('tabpanel').doLayout();
//                }
//            }
//        });
        
    },
    
    editItem: function(grid, record) {
        var view = Ext.widget('CatalogEdit');
        view.down('form').loadRecord(record);
    }
});