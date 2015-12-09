Ext.define('xlib.AccountsCombo', {
    
//    extend: 'xlib.form.ComboBox',
    extend: 'Ext.form.field.ComboBox',
    
    alias: ['widget.AccountsCombo'],
    
    valueField: 'id',
    
    displayField: 'name', 
    
    fieldLabel: 'Аккаунт',
    
    editable: false,
    
    fieldName: 'account_id',

    pageSize: 25,

    value: '',
    
    store: { 
        
        storeId: 'AccountsComboStore',
    
        fields: ['id', 'name'],

        autoLoad: true,
        
        remoteSort: true,
        
        sorters: [{
        	property: 'name'
        }],

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
    }
});