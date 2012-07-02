Ext.define('EC.Catalog.view.Conditioners.Filter.Purpose', {
    
    extend: 'Ext.form.ComboBox',
    
    alias: ['widget.ConditionersFilterPurpose'],
    
    valueField: 'id',
    
    displayField: 'name', 
    
    fieldLabel: 'Назначение',
    
    editable: false,
    
    fieldName: 'purpose',
    
    value: '',
    
    store: { 
        
        storeId: ['ConditionersFilterPurpose'],
    
        fields: ['id', 'name'], 
        
        data: [{
            id:     '',
            name:   '- Не выбрано -'
        }, {
            id:     'COMMON',
            name:   'Бытовое'
        }, {
            id:     'SEMI-INDUSTRIAL',
            name:   'Полупромышленное'
        }, {
            id:     'INDUSTRIAL',
            name:   'Промышленное'
        }] 
    }
});