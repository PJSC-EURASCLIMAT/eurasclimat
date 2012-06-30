Ext.define('App.view.TopPanel', {

    extend: 'Ext.toolbar.Toolbar',
    
    alias: 'widget.TopPanel',

    baseCls: 'xlib-bkg',
    
    region: 'north',
    
    padding: 5,
    
    border: false,
    
    items: ['->', {
        xtype: 'label',
        flex: 1,
        style: 'color: white; text-align: right; padding-right: 20px;',
        text: 'Вы вошли как ' 
            + xlib.Acl.Storage.getIdentity().name 
            + ' (' + xlib.Acl.Storage.getIdentity().login + ') '
    }, {
        xtype: 'button',
        text: 'Администрирование',
        pressed: true,
        hidden: !acl.isView('admin'),
        menu: [{
            text: 'Роли',
            iconCls: 'user-suit',
            lunchModule: 'EC.Admin.controller.Roles'
        }, {
            text: 'Пользователи',
            iconCls: 'user',
            lunchModule: 'EC.Admin.controller.Accounts'
        }, {
            text: 'Права доступа',
            iconCls: 'connect',
            lunchModule: 'EC.Admin.controller.Acl'
        }]
    }, ' ', {
        xtype: 'button',
        text: 'Выход',
        pressed: true,
        handler: function() {
            Ext.MessageBox.confirm('Подтверждение', 'Выйти из системы?', function(b) {
                if ('yes' === b) {
                    window.location.href = '/index/logout';
                }
            });
        }
    }]
});