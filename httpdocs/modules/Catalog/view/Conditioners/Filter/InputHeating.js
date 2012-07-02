Ext.define('EC.Catalog.view.Conditioners.Filter.InputHeating', {
    
    extend: 'Ext.form.ComboBox',
    
    alias: ['widget.ConditionersFilterInputHeating'],
    
    valueField: 'id',
    
    displayField: 'name', 
    
    fieldLabel: 'Нагрев <br/>(потребление)',
    
    editable: false,
    
    fieldName: 'input_heating',
    
    value: '',

    store: { 
        
        storeId: ['ConditionersFilterInputHeating'],
    
        fields: ['id', 'name'], 
        
        data: [{
            id:     '',
            name:   '- Не выбрано -'
        }, {
            id:     '1',
            name:   '0-2'
        }, {
            id:     '2',
            name:   '2-5'
        }, {
            id:     '3',
            name:   '5+'
        }] 
    }
});