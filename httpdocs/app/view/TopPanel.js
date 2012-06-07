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
            iconCls: 'user'
        }, {
            text: 'Права',
            iconCls: 'connect'
        }]
    }, ' ', {
        xtype: 'button',
        text: 'Выход',
        pressed: true,
        handler: function() {
            window.location.href = '/index/logout';
        }
    }]
    
});