Ext.define('EC.Catalog.view.Conditioners.Filter.InputHeating', {
    
    extend: 'Ext.form.ComboBox',
    
    alias: ['widget.ConditionersFilterInputHeating'],
    
    valueField: 'id',
    
    displayField: 'name', 
    
    emptyText: 'Охлаждение',
    
    fieldLabel: 'Охлаждение',
    
    editable: false,
    
    store: { 
        
        storeId: ['ConditionersFilterInputHeating'],
    
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