var isAuth = (xlib.Acl.Storage.getIdentity().login !== 'guest');

Ext.define('App.view.TopPanel', {

    extend: 'Ext.toolbar.Toolbar',
    
    alias: 'widget.TopPanel',

    baseCls: 'xlib-bkg',
    
    region: 'north',
    
    padding: '0',
    
    border: false,
    
    style: 'color: white;',
    
//    {
//        xtype: 'tbtext',
//        style: 'font-weight: 900; font-size: 1.25em; line-height: 1em; ' +
//               'color: rgb(181, 96, 65);',
//        text: 'Корпоративный портал планирования и реализации ' +
//              'инженерных проектов ОАО "Евразклимат"'
//    }, 
    
    items: ['->',
    {xtype: 'top-panel-msg-button'},
    {xtype: "tbspacer", width:15},
    {
        xtype: 'button',
        tooltip: 'Контакты',
        icon: '/images/icons/contacts_contact_book_address-16.png',
        arrowCls: '',
        action: 'contacts',
        menu: [
           {text: '115088, г.Москва, ул.Угрешская, д.2, стр.52', icon: '/images/icons/icon-building.png'},
           {text: '+7 495 988 9296', icon: '/images/icons/icon-phone.png'},
           {text: 'info@eurasmail.ru', icon: '/images/icons/icon-email.png'},
        ]
    },
    {xtype: "tbspacer", width:15},
    {
        xtype: 'button',
        tooltip: 'Все виджеты',
        icon: '/images/icons/widgets_all.png',
        arrowCls: '',
        action: 'allwidgets',
        menu: [{
            text: 'Новости',
            icon: '/images/icons/news_list.png',
            initConfig: {
                title: 'Новости',
                icon: '/images/icons/news_list.png',
                portletHeight: 210,
                position: 'MainPanel-column-1',
                launchModule: 'EC.Main.controller.News'
            }
        }, {
            text: 'Разработка системы',
            icon: '/images/icons/about.png',
            initConfig: {
                title: 'Разработка системы',
                icon: '/images/icons/about.png',
                portletHeight: 410,
                position: 'MainPanel-column-1',
                launchModule: 'EC.Main.controller.Sysdev'
            }
        }, {
            text: 'Курсы валют',
            icon: '/images/icons/cur_exch.png',
            initConfig: {
                title: 'Курсы валют',
                icon: '/images/icons/cur_exch.png',
                portletHeight: 200,
                position: 'MainPanel-column-3',
                launchModule: 'EC.Main.controller.Currency'
            }
        }, {
            text: 'Прогноз погоды',
            icon: '/images/icons/kweather.png',
            initConfig: {
                title: 'Прогноз погоды',
                icon: '/images/icons/kweather.png',
                portletHeight: 300,
                position: 'MainPanel-column-3',
                launchModule: 'EC.Main.controller.Weather'
            }
        }]
    },
    {xtype: "tbspacer", width:15},
    {
        xtype: 'button',
        tooltip: isAuth ? 'Выход' : 'Вход/Регистрация',
        icon: isAuth ? '/images/icons/logout.png' : '/images/icons/login.png',
        arrowCls: '',
        action: 'auth',
        menu: [{
            text: 'Мой профиль <br/>' + xlib.Acl.Storage.getIdentity().name +
                ' (' + xlib.Acl.Storage.getIdentity().login + ') ',
            icon: '/images/icons/about.png',
            hidden: !isAuth,
            action: 'run',
            launchModule: 'EC.PA.controller.Profile'
        }, {
            text: 'Регистрация',
            icon: '/images/icons/about.png',
            hidden: isAuth,
            action: 'run',
            launchModule: 'App.controller.Register'
        }, {
            text: isAuth ? 'Выйти из системы' : 'Войти в систему',
            icon: isAuth ? '/images/icons/logout.png' : '/images/icons/login.png',
            action: 'auth',
            launchModule: 'App.controller.Auth'
        }]
    }, ' ', ' ', ' ', ' ', ' ', ' ']
});