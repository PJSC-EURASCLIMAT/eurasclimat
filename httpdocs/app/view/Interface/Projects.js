Ext.define('App.view.Interface.Projects', {

    extend: 'App.view.PortalLayoutAbstarct',
    
    alias: 'widget.ProjectsPanel',

    title: 'Заказы-проекты',
    
    icon: '/images/icons/sys_dev.png',
    
    loaded: false,
        
    items: [{
        title: 'Панель виджетов',
        xtype: 'portalpanel',
        border: false,
        closable: false,
        columns: 3,
        items: [{
            id: 'ProjectsPanel-orders-column-1'
        }, {
            id: 'ProjectsPanel-orders-column-2'
        }, {
            id: 'ProjectsPanel-orders-column-3'
        }]
    }]

});