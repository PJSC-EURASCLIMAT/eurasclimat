Ext.define('EC.Catalog.view.Conditioners.Filter.Warranty', {
    
    extend: 'Ext.form.ComboBox',
    
    alias: ['widget.ConditionersFilterWarranty'],
    
    valueField: 'id',
    
    displayField: 'name', 
    
    fieldLabel: 'Гарантия',
    
    editable: false,
    
    value: '',
    
    store: { 
        
        storeId: ['ConditionersFilterWarranty'],
    
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