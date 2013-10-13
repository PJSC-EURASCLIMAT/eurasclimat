Ext.define('EC.SysDev.store.AccountStore', {

    extend: 'Ext.data.Store',
    
    alias: 'store.project-account-store',
   
    model: 'EC.SysDev.model.AccountModel',

    remoteFilter: false,

    remoteSort: false,
    
    proxy: {
        type: 'ajax',
        api: {
            read: '/json/sysdev/projects/get-account-list'
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
    }
    
    
});