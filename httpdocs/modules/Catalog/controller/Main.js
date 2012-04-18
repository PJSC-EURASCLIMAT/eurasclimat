Ext.define('EC.Catalog.controller.Main', {
    
    extend: 'Ext.app.Controller',

    //stores: [''],
    
    views: [
        'EC.Catalog.view.List',
        'EC.Catalog.view.Edit'
    ],
    
    init: function(container) {
        
        container.add({xtype: 'CatalogList'});
        
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