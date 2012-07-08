Ext.define('EC.Catalog.view.Dustextraction.Filter.Motor', {
    
    extend: 'Ext.form.ComboBox',
    
    alias: ['widget.DustextractionFilterMotor'],
    
    valueField: 'id',
    
    displayField: 'name', 
    
    fieldLabel: 'Тип мотора',
    
    editable: false,
    
    queryMode: 'local',
    
    fieldName: 'motor_id',
    
    value: '',
    
    store: { 
        
        storeId: ['DustextractionFilterMotor'],
        
        autoLoad: true,
    
        fields: ['id', 'name'], 
        
        proxy: {
            type: 'ajax',
            url: '/json/catalog/settings/get-list',
            extraParams: {entity: 'dustextraction_motors'},
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