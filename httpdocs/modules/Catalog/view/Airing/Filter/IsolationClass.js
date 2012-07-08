Ext.define('EC.Catalog.view.Airing.Filter.IsolationClass', {
    
    extend: 'Ext.form.ComboBox',
    
    alias: ['widget.AiringFilterIsolationClass'],
    
    valueField: 'id',
    
    displayField: 'name', 
    
    fieldLabel: 'Класс изоляции',
    
    editable: false,
    
    queryMode: 'local',
    
    fieldName: 'isolation_class_id',
    
    value: '',
    
    store: { 
        
        storeId: 'AiringFilterIsolationClass',
        
        autoLoad: true,
        
        fields: ['id', 'name'], 
        
        proxy: {
            type: 'ajax',
            url: '/json/catalog/settings/get-list',
            extraParams: {entity: 'airing_isolation_clases'},
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