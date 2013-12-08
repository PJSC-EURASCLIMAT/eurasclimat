Ext.define('xlib.AccountsCombo', {
    
    extend: 'Ext.form.ComboBox',
    
    alias: ['widget.AccountsCombo'],
    
    valueField: 'id',
    
    displayField: 'name', 
    
    fieldLabel: 'Аккаунт',
    
    editable: false,
    
    fieldName: 'account_id',
    
    value: '',
    
    store: { 
        
        storeId: 'AccountsComboStore',
    
        fields: ['id', 'name'],

        autoLoad: true,

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
        

    },
    
    getFilter: function() {
        return this.getValue(); 
    },
    
    statics: {
        getDisplayValue: function(v) {
            var store = Ext.getStore('CountryComboStore') 
                || Ext.create('widget.CountryCombo').getStore(),
                record = store ? store.getById(v) : null;
            return record ? record.get('name') : v;
        }
    }
});