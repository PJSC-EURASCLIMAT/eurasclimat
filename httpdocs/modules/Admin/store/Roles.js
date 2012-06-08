Ext.define('EC.Admin.store.Roles', {

    extend: 'Ext.data.TreeStore',
   
    model: 'EC.Admin.model.Roles',
    
    defaultRootId: null,
    
    autoSync: true,
    
    proxy: {
        type: 'ajax',
        api: {
            read:   '/json/admin/roles/get-list',
            update: '/json/admin/roles/update-role',
            destroy: '/json/admin/roles/remove-role'
        },
        writer: {
            root: 'data',
            encode: true
        }
    },
    
    constructor: function() {

        this.callParent(arguments);
        
        this.getProxy().on('exception', function(proxy, response, operation, eOpts) {
            
            if (operation.action === 'destroy') {
                var records = operation.getRecords();
                for (i=0; i< records.length; i++) {
                    var record = records[i];
                    Ext.Array.remove(this.removed, record);
                    var parentNode = this.getNodeById(record.get('parentId')) 
                        || this.getRootNode();
                    parentNode.insertChild(record.get('index'), record);
                }
                Ext.Msg.alert('Ошибка', 'Роль не удалена.');
            }
            
        }, this);
    }
});