Ext.define('EC.Main.view.Currency', {

    extend: 'Ext.grid.Panel',

    store: 'EC.Main.store.Currency',
    
    autoScroll: true,
    
    layout: 'fit',
    
    viewConfig: {
        scrollOffset: 28
    },
    
    hideHeaders: true,
    
    initComponent: function() {
        
        this.columns = [{
            xtype: 'templatecolumn',
            tpl: '<img src="/images/flags/{CharCode}.gif" /> {Name}',
            header: 'Название',
            dataIndex: 'CharCode',
            flex: 1
        }, {
            header: 'Номинал',
            dataIndex: 'Nominal',
            align: 'right',
            width: 70
        }, {
            width: 20,
            renderer: function() { return '=';}
        }, {
            header: 'Курс',
            width: 60,
            dataIndex: 'Value'
        }]
        
        this.callParent(arguments);
    }
});