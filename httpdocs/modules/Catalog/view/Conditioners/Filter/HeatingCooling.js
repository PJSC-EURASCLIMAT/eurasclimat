Ext.define('EC.Catalog.view.Conditioners.Filter.HeatingCooling', {
    
    extend: 'Ext.form.ComboBox',
    
    alias: ['widget.ConditionersFilterHeatingCooling'],
    
    valueField: 'id',
    
    displayField: 'name', 
    
    fieldLabel: 'Охлаждение/нагрев',
    
    editable: false,
    
    queryMode: 'local',
    
    fieldName: 'heatingcooling_id',
    
    value: '',
    
    store: { 
        
        storeId: 'ConditionersFilterHeatingCooling',
        
        autoLoad: true,
        
        fields: ['id', 'name'], 
        
        data: [{
            id:     '',
            name:   '- Не выбрано -'
        }, {
            id:     '0',
            name:   'только охлаждение'
        }, {
            id:     '1',
            name:   'охлаждение/нагрев'
        }]
    },

    getFilter: function() {
        return this.getValue() == '' ? '' : {eq: parseInt(this.getValue())};
    }
});