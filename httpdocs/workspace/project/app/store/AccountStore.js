Ext.define('Project.store.AccountStore', {

    extend: 'Ext.data.Store',
    
    alias: 'store.project-account-store',
   
    model: 'Project.model.AccountModel',
    
    proxy: {
        type: 'ajax',
        api: {
            read: '/json/admin/accounts/get-list'
        },
        reader: {
            type: 'json',
            root: 'rows',
            successProperty: 'success'
        },
        writer: {
            root: 'data',
            encode: true
        }
    },
    
    
});