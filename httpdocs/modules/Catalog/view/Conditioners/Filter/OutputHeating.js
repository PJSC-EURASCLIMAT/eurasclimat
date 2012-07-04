Ext.define('EC.Catalog.view.Conditioners.Filter.OutputHeating', {
    
    extend: 'Ext.form.ComboBox',
    
    alias: ['widget.ConditionersFilterOutputHeating'],
    
    valueField: 'id',
    
    displayField: 'name', 
    
    fieldLabel: 'Нагрев <br/>(производительность)',
    
    editable: false,
    
    fieldName: 'output_heating',
    
    value: '',
    
    store: { 
        
        storeId: ['ConditionersFilterOutputHeating'],
    
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
    },
    
    getFilter: function() {
        
        switch(this.getValue()) {
            case '': 
                return '';
            case '1': 
                return {lt: 2};
            case '2': 
                return {gt: 2, lt: 5};
            case '3': 
                return {gt: 5};
        }
    }
});