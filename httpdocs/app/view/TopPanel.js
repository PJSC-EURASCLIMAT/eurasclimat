Ext.define('App.view.TopPanel', {

    extend: 'Ext.toolbar.Toolbar',
    
    alias: 'widget.TopPanel',

    baseCls: 'xlib-bkg',
    
    region: 'north',
    
    padding: 5,
    
    border: false,
    
    items: ['->', {
        xtype: 'button',
        text: 'Администрирование',
        pressed: true,
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