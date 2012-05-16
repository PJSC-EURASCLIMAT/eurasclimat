Ext.define('EC.Catalog.view.Conditioners.Filter.OutputHeating', {
    
    extend: 'Ext.form.ComboBox',
    
    alias: ['widget.ConditionersFilterOutputHeating'],
    
    valueField: 'id',
    
    displayField: 'name', 
    
    emptyText: 'Охлаждение',
    
    editable: false,
    
    store: { 
        
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