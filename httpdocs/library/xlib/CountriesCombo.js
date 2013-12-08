Ext.define('xlib.CountriesCombo', {
    
    extend: 'Ext.form.ComboBox',
    
    alias: ['widget.CountriesCombo'],
    
    valueField: 'id',
    
    displayField: 'name', 
    
    fieldLabel: 'Страна',
    
    editable: false,
    
    queryMode: 'local',
    
    labelWidth: 60,
    
    name: 'country',
    
    hiddenName: 'country_id',
    
    value: '',
    
    store: { 
        
        storeId: 'CountriesComboStore',
        
        autoLoad: true,
        
        fields: ['id', 'name'], 
        
        proxy: {
            type: 'ajax',
            url: '/json/default/locations/get-countries',
            reader: {
                type: 'json',
                root: 'data',
                successfield: 'success'
            }
        }
    },

    initComponent: function() {
        
        this.callParent(arguments);
        
        this.getStore().on('load', function(store, records, success, eOpts) {
            store.insert(0, {id: '', name: '- Весь мир -'});
            if (Ext.isEmpty(this.getValue())) {
                this.suspendEvents();
                this.setValue('');
                this.resumeEvents();
            }
        }, this);        
    },
    
    getFilter: function() {
        return this.getValue() == '' ? '' : {eq: parseInt(this.getValue())};
    }
});