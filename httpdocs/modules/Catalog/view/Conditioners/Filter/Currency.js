Ext.define('EC.Catalog.view.Conditioners.Filter.Currency', {
    
    extend: 'Ext.form.ComboBox',
    
    alias: ['widget.ConditionersFilterCurrency'],
    
    valueField: 'id',
    
    displayField: 'name', 
    
    fieldLabel: 'Валюта',
    
    editable: false,
    
    queryMode: 'local',
    
    fieldName: 'currency_id',
    
    value: '0',
    
    store: { 
        
        storeId: ['ConditionersFilterCurrency'],
        
        fields: ['id', 'name'], 
        
        data: [{
            id:     '0',
            name:   '- Не выбрано -'
        }, {
            id:     '1',
            name:   'Руб.'
        }, {
            id:     '2',
            name:   'USD'
        }, {
            id:     '3',
            name:   'EUR'
        }]
    },

    getFilter: function() {
        return this.getValue() == '0' ? '' : {eq: parseInt(this.getValue())};
    }
});