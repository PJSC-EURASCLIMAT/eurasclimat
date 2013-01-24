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
//            text: 'Каталоги',
//            title: 'Каталоги продукции и услуг',
//            icon: '/images/icons/catalogue.png',
//            launchModule: 'EC.Catalog.controller.Main',
//            hidden: !acl.isView('catalog')
//        }, {
            text: 'Администрирование',
            iconCls: 'expand-all',
            hidden: !acl.isView('admin'),
            launchModule: 'EC.Admin.controller.Main'
//        }, {
//            text: 'Личный кабинет',
//            icon: '/images/icons/worker.png',
//            hidden: xlib.Acl.Storage.getIdentity().login == 'guest', 
//            launchModule: 'EC.Pa.controller.Main'    
//        }, {
//            text: xlib.Acl.Storage.getIdentity().login == 'guest' 
//                ? 'Войти в систему' : 'Выйти из системы',
//            icon: '/images/icons/login.png',
//            launchModule: 'App.controller.Auth'
            
        }, {
            text: 'Проекты',
            icon: '/images/icons/catalogue.png',
            disabled: true
        }, {
            text: 'Группы',
            icon: '/images/icons/catalogue.png',
            disabled: true
        }, {
            text: 'Рейтинги',
            icon: '/images/icons/catalogue.png',
            disabled: true
        }, {
            text: 'Документы',
            icon: '/images/icons/catalogue.png',
            disabled: true
        }, {
            text: 'Платежи',
            icon: '/images/icons/catalogue.png',
            disabled: true
        }, {
            text: 'Статистика',
            icon: '/images/icons/catalogue.png',
            disabled: true
        }, {
            text: 'Обучение',
            icon: '/images/icons/catalogue.png',
            disabled: true
        }]
    }]
});