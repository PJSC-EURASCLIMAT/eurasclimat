Ext.define('EC.Catalog.view.Airing.Filter.PowerSource', {
    
    extend: 'Ext.form.ComboBox',
    
    alias: ['widget.AiringFilterPowerSource'],
    
    valueField: 'id',
    
    displayField: 'name', 
    
    fieldLabel: 'Источник питания',
    
    editable: false,
    
    queryMode: 'local',
    
    fieldName: 'power_source_id',
    
    value: '',
    
    store: { 
        
        storeId: 'AiringFilterPowerSource',
        
        autoLoad: true,
        
        fields: ['id', 'name'], 
        
        proxy: {
            type: 'ajax',
            url: '/json/catalog/settings/get-list',
            extraParams: {entity: 'airing_power_sources'},
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
            store.insert(0, {id: '', name: '- Не выбрано -'});
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