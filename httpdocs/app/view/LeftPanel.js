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
            textAlign: 'left',
//            hidden: !acl.isView('admin')
        },
        items: [{
//            text: 'Каталоги',
//            title: 'Каталоги продукции и услуг',
//            icon: '/images/icons/catalogue.png',
//            launchModule: 'EC.Catalog.controller.Main',
//            hidden: !acl.isView('catalog')
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
//        }, {
            xtype: 'label',
            text: 'Глобальное меню:'
        }, {
            text: 'Меню №1',
            icon: '/images/icons/catalogue.png',
            disabled: true
        }, {
            text: 'Меню №2',
            icon: '/images/icons/catalogue.png',
            disabled: true
        }, {
            text: 'Меню №3',
            icon: '/images/icons/catalogue.png',
            disabled: true
        }, {
            xtype: 'label',
            text: 'Статичное меню:'
        }, {
            text: 'Функции раздела',
            icon: '/images/icons/cur_exch.png',
            disabled: true
        }, {
            text: 'Сервисы раздела',
            icon: '/images/icons/cur_exch.png',
            disabled: true
        }, {
            text: 'Документы раздела',
            icon: '/images/icons/cur_exch.png',
            disabled: true
        }, {
            text: 'Конструктор раздела',
            icon: '/images/icons/cur_exch.png',
            disabled: true
        }, {
            text: 'Настройки раздела',
            icon: '/images/icons/cur_exch.png',
            disabled: true
        }, {
            xtype: 'label',
            text: 'Динамичное меню:'
        }, {
            text: 'Меню (подраздел №...)',
            icon: '/images/icons/cur_exch.png',
            disabled: true
        }, {
            text: 'Меню (подраздел №...)',
            icon: '/images/icons/cur_exch.png',
            disabled: true
        }, {
            xtype: 'label',
            text: 'Системные виджеты:',
            hidden: !acl.isView('admin')
        }, {
            text: 'Администрирование',
            iconCls: 'expand-all',
            hidden: !acl.isView('admin'),
            launchModule: 'EC.Admin.controller.Main'
        }]
    }]
});