Ext.define('EC.Admin.store.Roles', {

    extend: 'Ext.data.TreeStore',
   
    model: 'EC.Admin.model.Roles',
    
    defaultRootId: null,
    
    //autoSync: true,
    
    autoLoad: true,
    
    storeId: 'EC.Admin.store.Roles',
    
    proxy: {
        type: 'ajax',
        api: {
            create:     '/json/admin/roles/create-role',
            read:       '/json/admin/roles/get-list',
            update:     '/json/admin/roles/update-role',
            destroy:    '/json/admin/roles/remove-role'
        },
        writer: {
            root: 'data',
            encode: true
        }
    },
    
    constructor: function() {

        this.callParent(arguments);
        
        this.getProxy().on('exception', function(proxy, response, operation, eOpts) {
            
            switch (operation.action) {
                case 'create': 
                    this.onCreateException.apply(this, arguments);
                    break;
                case 'read': 
                    this.onReadException.apply(this, arguments);
                    break;
                case 'update': 
                    this.onUpdateException.apply(this, arguments);
                    break;
                case 'destroy':
                    this.onDestroyException.apply(this, arguments);
                    break;
            }
            
        }, this);
        
        this.on('write', function(store, operation, eOpts) {
            if ('create' == operation.action) {
                this.onCreateSuccess.apply(this, arguments);
            }
        }, this);
        
    },
    
    onCreateSuccess: function(store, operation, eOpts) {
        
        var resp = Ext.decode(operation.response.responseText, true);
        
        if (resp && resp.success && resp.id) {
            Ext.each(operation.getRecords(), function(record) {
                record.set('id', resp.id);
                return false;
            }, this);
        }
    },
    
    onCreateException: function(proxy, response, operation, eOpts) {
        
        Ext.each(operation.getRecords(), function(record) {
            Ext.Array.remove(this.removed, record);
            var parentNode = this.getNodeById(record.get('parentId')) 
                || this.getRootNode();
            parentNode.removeChild(record);
        }, this);
        
        Ext.Msg.alert('Ошибка', 'Ошибка создания.');
    },
    
    onReadException: function(proxy, response, operation, eOpts) {
        
        Ext.Msg.alert('Ошибка', 'Ошибка чтения.');
    },
    
    onUpdateException: function(proxy, response, operation, eOpts) {
        
        Ext.each(operation.getRecords(), function(record) {
            record.reject();
        }, this);
        
        Ext.Msg.alert('Ошибка', 'Ошибка сохранения.');
    },
    
    onDestroyException: function(proxy, response, operation, eOpts) {
        
        Ext.each(operation.getRecords(), function(record) {
            Ext.Array.remove(this.removed, record);
            var parentNode = this.getNodeById(record.get('parentId')) 
                || this.getRootNode();
            parentNode.insertChild(record.get('index'), record);
        }, this);
        
        Ext.Msg.alert('Ошибка', 'Ошибка удаления.');
    }
});