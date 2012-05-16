Ext.define('EC.Catalog.view.Conditioners.Filter.Volume', {
    
    extend: 'Ext.form.ComboBox',
    
    alias: ['widget.ConditionersFilterVolume'],
    
    valueField: 'id',
    
    displayField: 'name', 
    
    emptyText: 'Объём',
    
    fieldLabel: 'Объём',
    
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