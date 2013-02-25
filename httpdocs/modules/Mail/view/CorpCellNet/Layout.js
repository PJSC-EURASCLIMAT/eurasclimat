Ext.define('EC.Mail.view.CorpCellNet.Layout', {

    extend: 'Ext.tab.Panel',

    title: 'Корп. сотовая связь',
    
    icon: '/images/icons/about.png',

    tabPosition: 'bottom',
    
    closable: false,
    
    border: false,
        
    defaults: {
        layout: 'fit',
        closable: true
    },
    
    items: [{
        title: 'Панель виджетов',
        xtype: 'portalpanel',
        border: false,
        closable: false,
        columns: 3,
        items: [{}, {}, {}]
    }]
});