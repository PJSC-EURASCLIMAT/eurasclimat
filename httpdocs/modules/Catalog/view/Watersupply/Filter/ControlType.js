Ext.define('EC.Catalog.view.Watersupply.Filter.ControlType', {
    
    extend: 'Ext.form.ComboBox',
    
    alias: ['widget.WatersupplyFilterControlType'],
    
    valueField: 'id',
    
    displayField: 'name', 
    
    fieldLabel: 'Управление системой',
    
    editable: false,
    
    queryMode: 'local',
    
    fieldName: 'control_type_id',
    
    value: '',
    
    store: { 
        
        storeId: ['WatersupplyFilterControlType'],
    
        autoLoad: true,
        
        fields: ['id', 'name'], 
        
        proxy: {
            type: 'ajax',
            url: '/json/catalog/settings/get-list',
            extraParams: {entity: 'watersupply_control_types'},
            reader: {
                type: 'json',
                root: 'data',
                successfield: 'success'
            }
        }
    },
    
    initComponent: function() {
        
        this.callParent(arguments);
        
        this.getStore().on('load', function(store, records, success, eOpts) {
            store.insert(0, {id: '', name: '- Не выбрано -'});
            if (Ext.isEmpty(this.getValue())) {
                this.suspendEvents();
                this.setValue('');
                this.resumeEvents();
            }
        }, this);
    },
    
    getFilter: function() {
        return this.getValue() == '' ? '' : {eq: parseInt(this.getValue())};
    }
});