Ext.define('App.view.TopPanel', {

    extend: 'Ext.toolbar.Toolbar',
    
    alias: 'widget.TopPanel',

    baseCls: 'xlib-bkg',
    
    region: 'north',
    
    padding: 5,
    
    border: false,
    
    style: 'color: white;',
    
    items: ['->', function() {
        return xlib.Acl.Storage.getIdentity().login == 'guest' ? {
            xtype: 'label',
            flex: 1,
            style: 'text-align: right; padding-right: 10px; text-decoration: underline;',
            text: 'Регистрация'
        } : {
            xtype: 'label',
            flex: 1,
            style: 'text-align: right; padding-right: 10px;',
            text: xlib.Acl.Storage.getIdentity().name, 
            qtip: xlib.Acl.Storage.getIdentity().login
        }
    }(), function() {
        return xlib.Acl.Storage.getIdentity().login == 'guest' ? {
            xtype: 'label',
            text: ' '
        } : {
            xtype: 'label',
            style: 'text-align: right; padding-right: 10px;',
            text: '|'        
        }
    }(), {
        xtype: 'label',
        style: 'text-align: right; padding-right: 10px; text-decoration: underline;',
        text: 'Мой профиль',
        hidden: xlib.Acl.Storage.getIdentity().login == 'guest'
    }, {
        xtype: 'button',
        action: 'auth',
        text: xlib.Acl.Storage.getIdentity().login == 'guest' 
            ? 'Войти в систему' : 'Выйти из системы',
        pressed: true,
        launchModule: 'App.controller.Auth'
    }]
});