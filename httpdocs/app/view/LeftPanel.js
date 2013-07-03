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
        height: 150, 
        margin: 10,
        items: [{
            xtype: 'flash',
            url: '/images/LOGO.133x133_out.swf',
            width: 130,
            height: 130,
            wmode: 'transparent'
        }, {
            xtype: 'image',
            src: '/images/logo_text.png'
        }]
    }, {
        region: 'center',
        baseCls: 'xlib-bkg',
        autoScroll: true,
        layout: {
            type: 'vbox',
            align: 'stretch'
        },
        padding: 5,
        defaults: {
            xtype: 'toolbar',
            style: 'margin-bottom: 10px;',
            baseCls: 'xlib-bkg',
            defaults: {
                width: 'auto',
                pressed: true,
                style: 'margin-top: 5px;',
                textAlign: 'left'
            },
            layout: {
                type: 'vbox',
                align: 'stretch'
            }
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
            text: 'Глобальное меню',
            xtype: 'label',
            style: 'margin-top: 0;',
            cls: 'x-panel-header-text-default'
        }, {
            id: 'EC-global-menu',
            items: [{
                text: 'Проекты',
                icon: '/images/icons/projects.png'
            }, {
                text: 'Навигация',
                icon: '/images/icons/navigation.png'
            }, {
                text: 'Оповещения',
                icon: '/images/icons/messages.png'
            }, {
                text: 'Администрация',
                icon: '/images/icons/correspondence.png'
            }, {
                text: 'Новости', 
                icon: '/images/icons/news.png'
            }]
        }, {
            text: 'Меню раздела',
            xtype: 'label',
            style: 'margin-top: 10px;',
            cls: 'x-panel-header-text-default'
        }, {
            id: 'EC-chapter-menu',
            items: []
        }, {
            text: 'Меню подраздела',
            xtype: 'label',
            style: 'margin-top: 10px;',
            cls: 'x-panel-header-text-default'
        }, {
            id: 'EC-subchapter-menu',
            items: []
        }, {
            text: 'Служебное меню',
            xtype: 'label',
            hidden: !acl.isView('admin'),
            style: 'margin-top: 10px;',
            cls: 'x-panel-header-text-default'
        }, {
            id: 'EC-support-menu',
            hidden: !acl.isView('admin'),
            items: [{
                text: 'Администрирование',
                iconCls: 'expand-all',
                action: 'admin',
                hidden: !acl.isView('admin'),
                launchModule: 'EC.Admin.controller.Main'
            }]
        }]
    }]
});