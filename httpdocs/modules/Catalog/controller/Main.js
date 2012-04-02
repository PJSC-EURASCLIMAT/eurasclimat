Ext.define('EC.Catalog.controller.Main', {
    
    extend: 'Ext.app.Controller',

    //stores: [''],
    
    views: [
        'EC.Catalog.view.List',
        'EC.Catalog.view.Edit'
    ],
    
    init: function() {
        
        this.application.viewport.add({xtype: 'CatalogList'});
        
        this.control({
            'CatalogList': {
                itemdblclick: this.editItem
            }
        });
        //container.add({xtype: 'CatalogList'});
    },
    
    editItem: function(grid, record) {
        
        var view = Ext.widget('CatalogEdit');

        view.down('form').loadRecord(record);
    }
});