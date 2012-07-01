Ext.define('EC.Catalog.view.Conditioners.Filter.ImplementationType', {
    
    extend: 'Ext.form.ComboBox',
    
    alias: ['widget.ConditionersFilterImplementationType'],
    
    valueField: 'id',
    
    displayField: 'name', 
    
    emptyText: 'Тип исполнения',
    
    fieldLabel: 'Тип исполнения',
    
    editable: false,
    
    queryMode: 'local',
    
    store: { 
        
        storeId: ['ConditionersFilterImplementationType'],
    
        autoLoad: true,
        
        fields: ['id', 'name'], 
        
        proxy: {
            type: 'ajax',
            url: '/json/catalog/settings/get-list',
            extraParams: {entity: 'conditioners_implementation_types'},
            reader: {
                type: 'json',
                root: 'data',
                successProperty: 'success'
            }
        } 
    }
});