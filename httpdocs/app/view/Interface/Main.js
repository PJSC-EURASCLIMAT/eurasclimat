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
        columns: 2,
        items: [{
            id: 'MainPanel-column-1',
        	columnWidth: 0.7
        }, {
            id: 'MainPanel-column-2',
        	columnWidth: 0.3
//        }, {
//            id: 'MainPanel-column-3'
        }]
    }]
});