Ext.define('EC.PA.store.Accounts', {

    extend: 'Ext.data.Store',

    storeId: 'AccountsNames',

    model: 'EC.PA.model.Account',

    proxy: {
        type: 'ajax',
        api: {
            read:   '/json/pa/info/get-account-list'
        },
        reader: {
            type: 'json',
            root: 'data',
            successProperty: 'success'
        }
    }

});