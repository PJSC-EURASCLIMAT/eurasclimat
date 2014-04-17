Ext.define('App.view.Interface.Main', {

    extend: 'App.view.PortalLayoutAbstarct',

    alias: 'widget.MainPanel',
    
    title: 'Главная',
    
    icon: '/images/icons/main.png',

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