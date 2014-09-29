Ext.define('EC.Catalog.view.Conditioners.Filter.PowerSource', {
    
    extend: 'Ext.form.ComboBox',
    
    alias: ['widget.ConditionersFilterPowerSource'],
    
    valueField: 'id',
    
    displayField: 'name', 
    
    fieldLabel: 'Наличие инвертора',
    
    editable: false,
    
    queryMode: 'local',
    
    fieldName: 'power_source_id',
    
    value: '',
    
    store: { 
        
        storeId: 'ConditionersFilterPowerSource',
        
        autoLoad: true,
        
        fields: ['id', 'name'], 
        
        data: [{
            id:     '',
            name:   '- Не выбрано -'
        }, {
            id:     '0',
            name:   'Нет'
        }, {
            id:     '1',
            name:   'Есть'
        }]
    },

    getFilter: function() {
        return this.getValue() == '' ? '' : {eq: parseInt(this.getValue())};
    }
});