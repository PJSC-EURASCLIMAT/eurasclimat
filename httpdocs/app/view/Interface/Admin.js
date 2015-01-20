Ext.define('App.view.Interface.Admin', {

    extend: 'App.view.PortalLayoutAbstarct',

    alias: 'widget.AdminPanel',
    
//    itemId: 'AdminPanel',
    
    title: 'Администрирование',

    iconCls: 'expand-all',
    
    items: [{
        title: 'Панель виджетов',
        xtype: 'portalpanel',
        border: false,
        closable: false,
        columns: 3,
        items: [{
        	id: 'AdminPanel-column-1'
        }, {
            id: 'AdminPanel-column-2'
        }, {
            id: 'AdminPanel-column-3'
        }]
    }]
});