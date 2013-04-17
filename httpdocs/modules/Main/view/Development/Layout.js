Ext.define('EC.Main.view.Development.Layout', {

    extend: 'App.view.PortalLayoutAbstarct',

    title: 'Разработка системы',
    
    icon: '/images/icons/sys_dev.png',
    
    loaded: false,
        
    items: [{
        title: 'Панель виджетов',
        xtype: 'portalpanel',
        id: 'mypanel',
        border: false,
        closable: false,
        columns: 3,
        items: [{
            id: 'MainPanel-development-column-1'
        }, {
            id: 'MainPanel-development-column-2'
        }, {
            id: 'MainPanel-development-column-3'
        }]
    }]

});