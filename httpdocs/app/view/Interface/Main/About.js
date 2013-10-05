Ext.define('App.view.Interface.Main.About', {

    extend: 'App.view.PortalLayoutAbstarct',

    title: 'О системе',
    
    icon: '/images/icons/about.png',

    items: [{
        title: 'Панель виджетов',
        xtype: 'portalpanel',
        border: false,
        closable: false,
        columns: 3,
        items: [{
            id: 'MainPanel-column-1'
        }, {
            id: 'MainPanel-column-2'
        }, {
            id: 'MainPanel-column-3'
        }]
    }]
});