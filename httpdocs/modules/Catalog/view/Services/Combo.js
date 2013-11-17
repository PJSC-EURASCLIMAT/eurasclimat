Ext.define('EC.Catalog.view.Services.Combo', {
    
    extend: 'Ext.form.ComboBox',
    
    alias: ['widget.ServicesCombo'],
    
    valueField: 'id',
    
    displayField: 'name', 
    
    fieldLabel: 'Наименование услуги',
    
    editable: false,
    
    queryMode: 'local',
    
    store: 'EC.Catalog.store.Services'
});