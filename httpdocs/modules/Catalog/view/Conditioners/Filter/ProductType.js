Ext.define('EC.Catalog.view.Conditioners.Filter.ProductType', {
    
    extend: 'Ext.form.ComboBox',
    
    alias: ['widget.ConditionersFilterProductType'],
    
    valueField: 'id',
    
    displayField: 'name', 
    
    emptyText: 'Тип продукции',
    
    fieldLabel: 'Тип продукции',
    
    editable: false,
    
    queryMode: 'local',
    
    store: { 
        
        autoLoad: true,
        
        fields: ['id', 'name'], 
        
        proxy: {
            type: 'ajax',
            url: '/json/catalog/settings/get-list',
            extraParams: {entity: 'product_types'},
            reader: {
                type: 'json',
                root: 'data',
                successProperty: 'success'
            }
        } 
    }
});