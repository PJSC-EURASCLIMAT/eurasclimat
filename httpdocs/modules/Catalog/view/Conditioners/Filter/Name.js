Ext.define('EC.Catalog.view.Conditioners.Filter.Name', {
    
    extend: 'Ext.form.ComboBox',
    
    alias: ['widget.ConditionersFilterName'],
    
    valueField: 'id',
    
    displayField: 'name', 
    
    emptyText: 'Наименование',
    
    fieldLabel: 'Наименование',
    
    editable: false,
    
    queryMode: 'local',
    
    store: { 
        
        autoLoad: true,
        
        fields: ['id', 'name'], 
        
        proxy: {
            type: 'ajax',
            url: '/json/catalog/settings/get-list',
            extraParams: {entity: 'names'},
            reader: {
                type: 'json',
                root: 'data',
                successProperty: 'success'
            }
        } 
    }
});