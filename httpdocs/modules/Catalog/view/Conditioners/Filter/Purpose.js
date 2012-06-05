Ext.define('EC.Catalog.view.Conditioners.Filter.Purpose', {
    
    extend: 'Ext.form.ComboBox',
    
    alias: ['widget.ConditionersFilterPurpose'],
    
    valueField: 'id',
    
    displayField: 'name', 
    
    emptyText: 'Назначение',
    
    fieldLabel: 'Назначение',
    
    editable: false,
    
    store: { 
        
        storeId: ['ConditionersFilterPurpose'],
    
        fields: ['id', 'name'], 
        
        data: [{
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