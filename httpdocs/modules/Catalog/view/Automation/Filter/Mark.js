Ext.define('EC.Catalog.view.Automation.Filter.Mark', {
    
    extend: 'Ext.form.ComboBox',
    
    alias: ['widget.AutomationFilterMark'],
    
    valueField: 'id',
    
    displayField: 'name', 
    
    fieldLabel: 'Марка',
    
    editable: false,
    
    queryMode: 'local',
    
    fieldName: 'mark_id',
    
    value: '',
    
    store: { 
        
        storeId: 'AutomationFilterMark',
        
        autoLoad: true,
        
        fields: ['id', 'name'], 
        
        proxy: {
            type: 'ajax',
            url: '/json/catalog/settings/get-list',
            extraParams: {entity: 'automation_marks'},
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