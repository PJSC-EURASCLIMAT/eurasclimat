Ext.define('EC.Catalog.view.Conditioners.Filter.Group', {
    
    extend: 'Ext.form.ComboBox',
    
    alias: ['widget.ConditionersFilterGroup'],
    
    valueField: 'id',
    
    displayField: 'name', 
    
    emptyText: 'Группа оборудования',
    
    editable: false,
    
    queryMode: 'local',
    
    store: { 
        
        autoLoad: true,
        
        fields: ['id', 'name'], 
        
        proxy: {
            type: 'ajax',
            url: '/json/catalog/settings/get-list',
            extraParams: {entity: 'groups'},
            reader: {
                type: 'json',
                root: 'data',
                successProperty: 'success'
            }
        } 
    }
});