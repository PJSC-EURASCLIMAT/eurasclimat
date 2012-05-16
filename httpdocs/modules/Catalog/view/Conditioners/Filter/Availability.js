Ext.define('EC.Catalog.view.Conditioners.Filter.Availability', {
    
    extend: 'Ext.form.ComboBox',
    
    alias: ['widget.ConditionersFilterAvailability'],
    
    valueField: 'id',
    
    displayField: 'name', 
    
    emptyText: 'Назначение',
    
    editable: false,
    
    store: { 
        
        fields: ['id', 'name'], 
        
        data: [{
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