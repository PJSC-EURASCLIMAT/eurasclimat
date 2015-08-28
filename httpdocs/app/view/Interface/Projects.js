Ext.define('App.view.Interface.Projects', {

    // extend: 'Ext.panel.Panel',
    extend: 'App.view.PortalLayoutAbstarct',
    
    alias: 'widget.ProjectsPanel',

    icon: '/images/icons/sys_dev.png',
    
    title: 'Заказы-проекты',

    /*
    layout: 'fit',

    padding: 10,
    
    border: false
    */
         
    items: [{
        title: 'Панель виджетов',
        xtype: 'portalpanel',
        border: false,
        closable: false,
        columns: 3,
        hidden: true,
        items: [{
            id: 'MainPanel-column-1'
        }, {
            id: 'MainPanel-column-2'
        }, {
            id: 'MainPanel-column-3'
        }]
    }]
    
});