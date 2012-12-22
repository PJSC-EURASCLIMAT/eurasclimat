Ext.define('EC.Main.view.Currency', {

    extend: 'Ext.grid.Panel',

    store: 'EC.Main.store.Currency',
    
    autoScroll: true,
    
    layout: 'fit',
    
    viewConfig: {
        scrollOffset: 28
    },
    
    initComponent: function() {
        
        this.columns = [{
            header: 'NumCode',
            dataIndex: 'NumCode',
            hidden: true,
            width: 50
        }, {
            header: 'Название',
            dataIndex: 'Name',
            flex: 1
        }, {
            header: 'Номинал',
            dataIndex: 'Nominal',
            width: 70
        }, {
            header: 'Код',
            width: 40,
            dataIndex: 'CharCode'
        }, {
            header: 'Курс',
            width: 70,
            dataIndex: 'Value'
        }]
        
        this.callParent(arguments);
    }
});