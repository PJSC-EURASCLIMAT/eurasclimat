Ext.define('EC.Catalog.view.Conditioners.Filter.Square', {
    
    extend: 'Ext.form.ComboBox',
    
    alias: ['widget.ConditionersFilterSquare'],
    
    valueField: 'id',
    
    displayField: 'name', 
    
    fieldLabel: 'Площадь',
    
    editable: false,
    
    value: '',
    
    store: { 
        
        storeId: ['ConditionersFilterSquare'],
    
        fields: ['id', 'name'], 
        
        data: [{
            id:     '',
            name:   '- Не выбрано -'
        }, {
            id:     '1',
            name:   '0-50'
        }, {
            id:     '2',
            name:   '50-100'
        }, {
            id:     '3',
            name:   '100+'
        }] 
    }
});