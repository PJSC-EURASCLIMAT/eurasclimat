var isAuth = (xlib.Acl.Storage.getIdentity().login !== 'guest');

Ext.define('App.view.TopPanel', {

    extend: 'Ext.toolbar.Toolbar',
    
    alias: 'widget.TopPanel',

    baseCls: 'xlib-bkg',
    
    region: 'north',
    
    padding: 5,
    
    border: false,
    
    style: 'color: white;',
    
    items: ['->', {
        xtype: 'component',
        autoEl: {
            tag: 'a',
            href: '#',
            style: 'text-align: right; padding-right: 10px; color: white;',
            html: 'Регистрация',
            action: 'run',
            onClick: 'return false;',
            launchModule: 'App.controller.Register'
        },
        hidden: isAuth
    }, {
        xtype: 'tbtext',
        style: 'text-align: right; padding-right: 10px;',
        text: xlib.Acl.Storage.getIdentity().name, 
        qtip: xlib.Acl.Storage.getIdentity().login,
        hidden: !isAuth
    }, {
        xtype: 'tbtext',
        style: 'text-align: right; padding-right: 10px;',
        text: isAuth ? '|' : ''
    }, {
        xtype: 'component',
        autoEl: {
            tag: 'a',
            href: '#',
            style: 'text-align: right; padding-right: 10px; color: white;',
            html: 'Мой профиль',
            action: 'run',
            onClick: 'return false;',
            launchModule: 'EC.PA.controller.Profile'
        },
        hidden: !isAuth
    }, {
        xtype: 'button',
        action: 'auth',
        text: isAuth ? 'Выйти из системы' : 'Войти в систему',
        pressed: true,
        launchModule: 'App.controller.Auth'
    }]
});