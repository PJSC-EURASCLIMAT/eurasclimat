Ext.define('EC.Catalog.view.Dustextraction.Filter.Filtration', {
    
    extend: 'Ext.form.ComboBox',
    
    alias: ['widget.DustextractionFilterFiltration'],
    
    valueField: 'id',
    
    displayField: 'name', 
    
    fieldLabel: 'Фильтрация',
    
    editable: false,
    
    queryMode: 'local',
    
    fieldName: 'filtration_id',
    
    value: '',
    
    store: { 
        
        storeId: ['DustextractionFilterFiltration'],
        
        autoLoad: true,
    
        fields: ['id', 'name'], 
        
        proxy: {
            type: 'ajax',
            url: '/json/catalog/settings/get-list',
            extraParams: {entity: 'dustextraction_filtrations'},
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