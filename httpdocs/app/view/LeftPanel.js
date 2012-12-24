Ext.define('App.view.LeftPanel', {

    extend: 'Ext.Panel',
    
    alias: 'widget.LeftPanel',

    region: 'west',
    
    layout: 'border', 
    
    width: 150,
    
    baseCls: 'xlib-bkg',
    
    border: false,
    
    items: [{
        region: 'north',
        baseCls: 'xlib-bkg',
        height: 140, 
        items: [{
            xtype: 'image',
            src: '/images/logo.png',
            margin: '20 10'
        }]
    }, {
        region: 'center',
        baseCls: 'xlib-bkg',
        layout: {
            type: 'vbox',
            align: 'stretch'
        },
        padding: 5,
        defaultType: 'button',
        defaults: {
            margins: 5,
            textAlign: 'left'
        },
        items: [{
            text: 'Каталоги',
            title: 'Каталоги продукции и услуг',
            icon: '/images/icons/catalogue.png',
            launchModule: 'EC.Catalog.controller.Main',
            hidden: !acl.isView('catalog')
        }, {
            text: 'Администрирование',
            hidden: !acl.isView('admin'),
            launchModule: 'EC.Admin.controller.Main'
        }, {
            text: 'Личный кабинет',
            hidden: xlib.Acl.Storage.getIdentity().login == 'guest', 
            launchModule: 'EC.Pa.controller.Main'    
        }, {
            text: xlib.Acl.Storage.getIdentity().login == 'guest' 
                ? 'Войти в систему' : 'Выйти из системы',
            handler: function() {
                window.location.href = xlib.Acl.Storage.getIdentity().login == 'guest'
                    ? '/index/login' : '/index/logout';
            }
        }]
    }]
});