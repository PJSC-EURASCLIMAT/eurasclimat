Ext.define('EC.Catalog.store.Settings', {

    extend: 'Ext.data.Store',
   
    model: 'EC.Catalog.model.Settings',
    
    entity: null,

    proxy: {
        type: 'ajax',
        api: {
            create:     '/json/catalog/settings/add',
            read:       '/json/catalog/settings/get-list',
            update:     '/json/catalog/settings/update',
            destroy:    '/json/catalog/settings/delete'
        },
        reader: {
            type: 'json',
            root: 'data',
            successProperty: 'success'
        },
        writer: {
            root: 'data',
            encode: true
        }
    },
    
    constructor: function() {
        
        this.callParent(arguments);
        this.proxy.extraParams.entity = this.entity;
        this.load();
        
        this.on('write', function(store) {
            store.load();
        });
    }
});