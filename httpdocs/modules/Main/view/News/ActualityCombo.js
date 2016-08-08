Ext.define('EC.Main.view.News.ActualityCombo', {
    
    extend: 'Ext.form.ComboBox',
    
    alias: ['widget.NewsActualityCombo'],
    
    valueField: 'id',
    
    displayField: 'name', 
    
    fieldLabel: 'Актуальность',
    
    editable: false,
    
    queryMode: 'local',
    
    fieldName: 'date',
    
    labelWidth: 80,
    
    value: '',
    
    store: { 
        
        storeId: 'NewsActualityComboStore',
        
        autoLoad: true,
        
        fields: ['id', 'name'], 
        
        data: [{
            id:     '',
            name:   '- Все новости -'
        }, {
            id:     'today',
            name:   'Сегодняшние новости'
        }, {
            id:     'yesterday',
            name:   'Вчерашние новости'
        }, {
            id:     'lastthreedays',
            name:   'За последние три дня'
        }, {
            id:     'lastweek',
            name:   'За последнюю неделю'
        }, {
            id:     'lastmonth',
            name:   'За последний месяц'
        }] 
    },
    
    getFilter: function() {
        return this.getValue();
        switch (this.getValue()) {
            case 'today':
                return {after: new Date()};
            default:
                v = '';
                break;
        }
    }
});