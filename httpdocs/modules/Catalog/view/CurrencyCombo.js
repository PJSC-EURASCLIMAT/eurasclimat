Ext.define('EC.Catalog.view.CurrencyCombo', {
    
    extend: 'Ext.form.ComboBox',
    
    alias: ['widget.CatalogCurrencyCombo'],
    
    valueField: 'id',
    
    displayField: 'name', 
    
    fieldLabel: 'Валюта',
    
    editable: false,
    
    queryMode: 'local',
    
    fieldName: 'currency_id',
    
    value: '0',
    
    store: 'EC.Catalog.store.Currency',

    getFilter: function() {
        return this.getValue() == '0' ? '' : {eq: parseInt(this.getValue())};
    }
});