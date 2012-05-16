Ext.define('EC.Catalog.view.Conditioners.Filter.Mark', {
    
    extend: 'Ext.form.ComboBox',
    
    alias: ['widget.ConditionersFilterMark'],
    
    valueField: 'id',
    
    displayField: 'name', 
    
    emptyText: 'Марка',
    
    fieldLabel: 'Марка',
    
    editable: false,
    
    queryMode: 'local',
    
    store: { 
        
        autoLoad: true,
        
        fields: ['id', 'name'], 
        
        proxy: {
            type: 'ajax',
            url: '/json/catalog/settings/get-list',
            extraParams: {entity: 'marks'},
            reader: {
                type: 'json',
                root: 'data',
                successProperty: 'success'
            }
        } 
    }
});