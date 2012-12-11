Ext.define('EC.Admin.view.Layout', {

    extend: 'Ext.tab.Panel',

    requires: ['xlib.portal.PortalPanel'],
    
    alias: 'widget.AdminPanel',
    
    id: 'Admin-tab',
    
    title: 'Администрирование',

    tabPosition: 'bottom',
    
    closable: true,
    
    border: false,
    
    tbar: [{
        text: 'Роли',
        iconCls: 'user-suit',
        hidden: !acl.isView('admin'),
        launchModule: 'EC.Admin.controller.Roles'
    }, {
        text: 'Пользователи',
        iconCls: 'user',
        hidden: !acl.isView('admin'),
        launchModule: 'EC.Admin.controller.Accounts'
    }, {
        text: 'Права доступа',
        iconCls: 'connect',
        hidden: !acl.isView('admin'),
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
        }, {
        }, {
        }]
    }]
});