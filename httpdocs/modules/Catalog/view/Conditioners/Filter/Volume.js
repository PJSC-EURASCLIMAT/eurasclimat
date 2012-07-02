Ext.define('EC.Catalog.view.Conditioners.Filter.Volume', {
    
    extend: 'Ext.form.ComboBox',
    
    alias: ['widget.ConditionersFilterVolume'],
    
    valueField: 'id',
    
    displayField: 'name', 
    
    fieldLabel: 'Объём',
    
    editable: false,
    
    value: '',
    
    store: { 
        
        storeId: ['ConditionersFilterVolume'],
    
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