Ext.define('App.controller.Interface.Main', {
    
    extend: 'App.controller.ChapterAbstract',

    views: ['App.view.Interface.Main'],
    
    viewLayout: 'MainPanel',
    
    init: function() {
        
        var container = this.getContainer();
        
        container.fireEvent('activate');
        container.up('tabpanel').setActiveTab(0);
        
        var MC = this.getController('App.controller.Main');

        var modulesToOpen = [{
//            title: 'О компании',
//            icon: '/images/icons/about.png',
//            position: 'MainPanel-column-2',
//            portletHeight: 200,
//            allowMultiple: false,
//            launchModule: 'EC.Main.controller.AboutCompany'
//        }, {
//        	title: 'Мой профиль',
//        	icon: '/images/icons/about.png',
//        	portletHeight: 700,
//        	position: 'MainPanel-column-1',
//        	launchModule: 'EC.PA.controller.Profile'
//        }, {
        	title: 'Новости',
        	icon: '/images/icons/news.png',
        	portletHeight: 200,
        	position: 'MainPanel-column-2',
        	launchModule: 'EC.Main.controller.News'
        }, {
            title: 'Курсы валют',
            icon: '/images/icons/cur_exch.png',
            portletHeight: 200,
            position: 'MainPanel-column-2',
            launchModule: 'EC.Main.controller.Currency'
//        }, {
//        	title: 'Прогноз погоды',
//        	icon: '/images/icons/kweather.png',
//        	portletHeight: 700,
//        	position: 'MainPanel-column-2',
//        	launchModule: 'EC.Main.controller.Weather'
        }, {
            title: 'О системе',
            icon: '/images/icons/sys_dev.png',
            portletHeight: 750,
            position: 'MainPanel-column-1',
            launchModule: 'EC.Main.controller.AboutSystem'
        }, {
            title: 'Заказ',
            icon: '/images/icons/sys_dev.png',
            portletHeight: 330,
            position: 'MainPanel-column-2',
            launchModule: 'EC.Main.controller.Order'
//        }, {
//            text: 'Калькулятор ПИР',
//            title: 'Калькулятор ПИР',
//            icon: '/images/icons/about.png',
//            portletHeight: 305,
//            position: 'MainPanel-column-1',
//            launchModule: 'EC.CRM.controller.Calcpd.Main'
//        }, {
//            text: 'Калькулятор СМР',
//            title: 'Калькулятор СМР',
//            icon: '/images/icons/about.png',
//            portletHeight: 305,
//            position: 'MainPanel-column-1',
//            launchModule: 'EC.CRM.controller.Calcsmr.Main'
//        }, {
//            title: 'Специалисты',
//            icon: '/images/icons/sys_dev.png',
//            portletHeight: 370,
//            position: 'MainPanel-column-1',
//            launchModule: 'EC.Experts.controller.ActiveExperts'
//        }, {
//            title: 'С НАСТУПАЮЩИМ НОВЫМ ГОДОМ! ',
//            icon: '/images/icons/kweather.png',
//            portletHeight: 230,
//            position: 'MainPanel-column-2',
//            launchModule: 'EC.Main.controller.Newyear'
        }];
        
        Ext.each(modulesToOpen, function(item) {
            MC.openModulePortlet(item);
        });
    },
    
    getMenu: function() {
        
        var MC = this.getController('App.controller.Main');
        
        return [];
        /*
        return [{
            text: 'Заказ',
            title: 'Заказ',
            icon: '/images/icons/about.png',
            position: 'MainPanel-column-2',
            portletHeight: 200,
            allowMultiple: false,
            launchModule: 'EC.Main.controller.Order',
            handler: function(b) {
                MC.openModulePortlet(b.initialConfig);
            }
        }, {
            text: 'О системе',
            title: 'О системе',
            icon: '/images/icons/sys_dev.png',
            portletHeight: 410,
            position: 'MainPanel-column-1',
            launchModule: 'EC.Main.controller.AboutSystem',
            handler: function(b) {
                MC.openModulePortlet(b.initialConfig);
            }
        }, {
            text: 'Новости',
            title: 'Новости',
            icon: '/images/icons/news.png',
            position: 'MainPanel-column-1',
            portletHeight: 210,
            launchModule: 'EC.Main.controller.News',
            handler: function(b) {
                MC.openModulePortlet(b.initialConfig);
            }
        }];
        */
    }
});