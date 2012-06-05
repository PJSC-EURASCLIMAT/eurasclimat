Ext.define('EC.Catalog.view.Conditioners.Filter.Warranty', {
    
    extend: 'Ext.form.ComboBox',
    
    alias: ['widget.ConditionersFilterWarranty'],
    
    valueField: 'id',
    
    displayField: 'name', 
    
    emptyText: 'Гарантия',
    
    fieldLabel: 'Гарантия',
    
    editable: false,
    
    store: { 
        
        storeId: ['ConditionersFilterWarranty'],
    
        fields: ['id', 'name'], 
        
        data: [{
            id:     '0',
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