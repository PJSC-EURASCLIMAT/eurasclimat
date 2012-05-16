Ext.define('EC.Catalog.view.Conditioners.Filter.Square', {
    
    extend: 'Ext.form.ComboBox',
    
    alias: ['widget.ConditionersFilterSquare'],
    
    valueField: 'id',
    
    displayField: 'name', 
    
    emptyText: 'Площадь',
    
    fieldLabel: 'Площадь',
    
    editable: false,
    
    store: { 
        
        fields: ['id', 'name'], 
        
        data: [{
            id:     '0',
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