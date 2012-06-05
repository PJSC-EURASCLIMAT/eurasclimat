Ext.define('EC.Catalog.view.Conditioners.Filter.Condition', {
    
    extend: 'Ext.form.ComboBox',
    
    alias: ['widget.ConditionersFilterCondition'],
    
    valueField: 'id',
    
    displayField: 'name', 
    
    emptyText: 'Состояние',
    
    fieldLabel: 'Состояние',
    
    editable: false,
    
    store: { 
        
        storeId: ['ConditionersFilterCondition'],
        
        fields: ['id', 'name'], 
        
        data: [{
            id:     'NEW',
            name:   'Новое'
        }, {
            id:     'SHOWCASE',
            name:   'С витрины'
        }, {
            id:     'ILLIQUID',
            name:   'Неликвид'
        }, {
            id:     'USED',
            name:   'Бывшее в употреблении'
        }] 
    }
});