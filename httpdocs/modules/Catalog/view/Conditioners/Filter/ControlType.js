Ext.define('EC.Catalog.view.Conditioners.Filter.ControlType', {
    
    extend: 'Ext.form.ComboBox',
    
    alias: ['widget.ConditionersFilterControlType'],
    
    valueField: 'id',
    
    displayField: 'name', 
    
    fieldLabel: 'Управление системой',
    
    editable: false,
    
    queryMode: 'local',
    
    fieldName: 'control_type_id',
    
    value: '',
    
    store: { 
        
        storeId: ['ConditionersFilterControlType'],
    
        autoLoad: true,
        
        fields: ['id', 'name'], 
        
        proxy: {
            type: 'ajax',
            url: '/json/catalog/settings/get-list',
            extraParams: {entity: 'conditioners_control_types'},
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