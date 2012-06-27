Ext.define('EC.Admin.store.AccountRoles', {

    extend: 'Ext.data.TreeStore',
   
    model: 'EC.Admin.model.AccountRoles',
    
    storeId: 'AdminStoreAccountRoles',
    
    autoLoad: false,
    
    root: {
        children: [],
        expanded: true
    },
    
    proxy: {
        type: 'ajax',
        url: '/json/admin/roles/get-list-checked'
    }
});