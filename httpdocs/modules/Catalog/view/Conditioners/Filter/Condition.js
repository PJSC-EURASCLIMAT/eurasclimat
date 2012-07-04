Ext.define('EC.Catalog.view.Conditioners.Filter.Condition', {
    
    extend: 'Ext.form.ComboBox',
    
    alias: ['widget.ConditionersFilterCondition'],
    
    valueField: 'id',
    
    displayField: 'name', 
    
    fieldLabel: 'Состояние',
    
    editable: false,
    
    value: '',
    
    store: { 
        
        storeId: ['ConditionersFilterCondition'],
        
        fields: ['id', 'name'], 
        
        data: [{
            id:     '',
            name:   '- Не выбрано -'
        }, {
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
    },
    
    getFilter: function() {
        return this.getValue(); 
    }
});