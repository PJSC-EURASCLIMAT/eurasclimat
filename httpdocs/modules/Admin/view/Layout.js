Ext.define('EC.Admin.view.Layout', {

    extend: 'Ext.tab.Panel',

    requires: ['xlib.portal.PortalPanel'],
    
    alias: 'widget.AdminPanel',
    
    id: 'Admin-tab',
    
    title: 'Администрирование',

    tabPosition: 'bottom',
    
    iconCls: 'expand-all',
    
    closable: true,
    
    border: false,
    
    tbar: [{
        text: 'Роли',
        title: 'Роли',
        iconCls: 'user-suit',
        hidden: !acl.isView('admin'),
        position: 'AdminPanel-column-1',
        launchModule: 'EC.Admin.controller.Roles'
    }, {
        text: 'Пользователи',
        title: 'Пользователи',
        iconCls: 'user',
        hidden: !acl.isView('admin'),
        position: 'AdminPanel-column-2',
        launchModule: 'EC.Admin.controller.Accounts'
    }, {
        text: 'Права доступа',
        title: 'Права доступа',
        iconCls: 'connect',
        hidden: !acl.isView('admin'),
        position: 'AdminPanel-column-3',
        launchModule: 'EC.Admin.controller.Acl'
    }],
    
    defaults: {
        layout: 'fit',
        closable: true
    },
    
    items: [{
        title: 'Рабочий стол',
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