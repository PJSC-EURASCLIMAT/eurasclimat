Ext.define('EC.CRM.view.Methods.Layout', {

    extend: 'Ext.tab.Panel',

    title: 'Методики',
    
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