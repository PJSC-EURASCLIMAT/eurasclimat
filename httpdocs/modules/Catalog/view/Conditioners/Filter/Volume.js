Ext.define('EC.Catalog.view.Conditioners.Filter.Volume', {
    
    extend: 'Ext.form.ComboBox',
    
    alias: ['widget.ConditionersFilterVolume'],
    
    valueField: 'id',
    
    displayField: 'name', 
    
    fieldLabel: 'Объём',
    
    editable: false,

    fieldName: 'volume',
    
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
    },
    
    getFilter: function() {
        
        switch(this.getValue()) {
            case '': 
                return '';
            case '1': 
                return {lt: 50};
            case '2': 
                return {gt: 50, lt: 100};
            case '3': 
                return {gt: 100};
        }
    }
});