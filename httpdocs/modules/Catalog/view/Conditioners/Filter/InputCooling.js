Ext.define('EC.Catalog.view.Conditioners.Filter.InputCooling', {
    
    extend: 'Ext.form.ComboBox',
    
    alias: ['widget.ConditionersFilterInputCooling'],
    
    valueField: 'id',
    
    displayField: 'name', 
    
    fieldLabel: 'Охлаждение (потребление)',
    
    editable: false,
    
    value: '',
    
    store: { 
        
        storeId: ['ConditionersFilterInputCooling'],
    
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