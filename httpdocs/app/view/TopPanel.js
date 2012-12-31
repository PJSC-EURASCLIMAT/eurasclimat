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
        style: 'color: white; text-align: right; padding-right: 10px;',
        text: 'Вы вошли как ' 
            + xlib.Acl.Storage.getIdentity().name 
            + ' (' + xlib.Acl.Storage.getIdentity().login + ') '
    }, {
        xtype: 'button',
        action: 'auth',
        text: xlib.Acl.Storage.getIdentity().login == 'guest' 
            ? 'Войти в систему' : 'Выйти из системы',
        pressed: true,
        launchModule: 'App.controller.Auth'
    }]
});