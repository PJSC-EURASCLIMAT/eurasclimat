Ext.define('EC.Catalog.view.Conditioners.Filter.Availability', {
    
    extend: 'Ext.form.ComboBox',
    
    alias: ['widget.ConditionersFilterAvailability'],
    
    valueField: 'id',
    
    displayField: 'name', 
    
    fieldLabel: 'Назначение',
    
    editable: false,
    
    value: '',
    
    store: { 
        
        storeId: ['ConditionersFilterAvailability'],
    
        fields: ['id', 'name'], 
        
        data: [{
            id:     '',
            name:   '- Не выбрано -'
        }, {
            id:     'STORAGE',
            name:   'Склад'
        }, {
            id:     'RESERVE',
            name:   'Резерв'
        }, {
            id:     'ORDER',
            name:   'Заказ'
        }] 
    }
});