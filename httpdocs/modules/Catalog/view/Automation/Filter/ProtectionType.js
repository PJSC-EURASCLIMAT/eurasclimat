Ext.define('EC.Catalog.view.Automation.Filter.ProtectionType', {
    
    extend: 'Ext.form.ComboBox',
    
    alias: ['widget.AutomationFilterProtectionType'],
    
    valueField: 'id',
    
    displayField: 'name', 
    
    fieldLabel: 'Тип защиты',
    
    editable: false,
    
    queryMode: 'local',
    
    fieldName: 'protection_type_id',
    
    value: '',
    
    store: { 
        
        storeId: ['AutomationFilterProtectionType'],
    
        autoLoad: true,
        
        fields: ['id', 'name'], 
        
        proxy: {
            type: 'ajax',
            url: '/json/catalog/settings/get-list',
            extraParams: {entity: 'automation_protection_types'},
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