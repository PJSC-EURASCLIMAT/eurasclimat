Ext.define('EC.Main.view.News.CategoriesCombo', {
    
    extend: 'Ext.form.ComboBox',
    
    alias: ['widget.NewsCategoriesCombo'],
    
    valueField: 'id',
    
    displayField: 'name', 
    
    fieldLabel: 'Категория',
    
    editable: false,
    
    queryMode: 'local',
    
    fieldName: 'category_id',
    
    labelWidth: 60,
    
    value: '',
    
    store: { 
        
        storeId: 'NewsCategoriesComboStore',
        
        autoLoad: true,
        
        fields: ['id', 'name'], 
        
        proxy: {
            type: 'ajax',
            url: '/json/default/news/get-categories',
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
            store.insert(0, {id: '', name: '- Все категории -'});
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