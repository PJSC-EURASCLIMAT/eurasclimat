Ext.define('EC.Admin.store.AccountRoles', {

    extend: 'Ext.data.TreeStore',
   
    model: 'EC.Admin.model.AccountRoles',
    
    storeId: 'AdminStoreAccountRoles',
    
    proxy: {
        type: 'ajax',
        url: '/json/admin/roles/get-list-checked'
    }
});