Ext.define('EC.Catalog.view.Conditioners.Filter.ImplementationType', {
    
    extend: 'Ext.form.ComboBox',
    
    alias: ['widget.ConditionersFilterImplementationType'],
    
    valueField: 'id',
    
    displayField: 'name', 
    
    fieldLabel: 'Тип исполнения системы',
    
    editable: false,
    
    queryMode: 'local',
    
    fieldName: 'implementation_type_id',
    
    value: '',
    
    store: { 
        
        storeId: 'ConditionersFilterImplementationType',
    
        autoLoad: true,
        
        fields: ['id', 'name'], 
        
        proxy: {
            type: 'ajax',
            url: '/json/catalog/settings/get-list',
            extraParams: {entity: 'conditioners_implementation_types'},
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