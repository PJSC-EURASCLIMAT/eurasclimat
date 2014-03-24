Ext.define('App.controller.Interface.Main.About', {
    
    extend: 'App.controller.PortalAbstract',

    views: ['App.view.Interface.Main.About'],
    
    run: function(container) {

        this.getContainer(container);
        var MC = this.getController('App.controller.Main');

        var modulesToOpen = [{
//            title: 'О компании',
//            icon: '/images/icons/about.png',
//            position: 'MainPanel-column-2',
//            portletHeight: 200,
//            allowMultiple: false,
//            launchModule: 'EC.Main.controller.AboutCompany'
//        }, {
            title: 'Курсы валют',
            icon: '/images/icons/cur_exch.png',
            portletHeight: 200,
            position: 'MainPanel-column-3',
            launchModule: 'EC.Main.controller.Currency'
        }, {
            title: 'Новости',
            icon: '/images/icons/news.png',
            portletHeight: 200,
            position: 'MainPanel-column-2',
            launchModule: 'EC.Main.controller.News'
//        }, {
//            title: 'О системе',
//            icon: '/images/icons/sys_dev.png',
//            portletHeight: 370,
//            position: 'MainPanel-column-2',
//            launchModule: 'EC.Main.controller.AboutSystem'
        }, {
            text: 'ЗАКАЗЫ-ПРОЕКТЫ (ДЕМО)',
            title: 'ЗАКАЗЫ-ПРОЕКТЫ (ДЕМО)',
            icon: '/images/icons/catalog.png',
            portletHeight: 370,
            position: 'MainPanel-column-2',
            launchModule: 'EC.CRM.controller.Demoprojects.Projects',
            helpURL: '/html/crm/demoprojects/help'
//        }, {
//            title: 'Заказ',
//            icon: '/images/icons/sys_dev.png',
//            portletHeight: 370,
//            position: 'MainPanel-column-2',
//            launchModule: 'EC.Main.controller.Order'
        }, {
            text: 'Калькулятор ПИР',
            title: 'Калькулятор ПИР',
            icon: '/images/icons/about.png',
            portletHeight: 200,
            position: 'MainPanel-column-1',
            launchModule: 'EC.CRM.controller.Calcpd.Main'
        }, {
            title: 'Специалисты',
            icon: '/images/icons/sys_dev.png',
            portletHeight: 370,
            position: 'MainPanel-column-1',
            launchModule: 'EC.Experts.controller.ActiveExperts'
        }, {
            title: 'Прогноз погоды',
            icon: '/images/icons/kweather.png',
            portletHeight: 370,
            position: 'MainPanel-column-3',
            launchModule: 'EC.Main.controller.Weather'
//        }, {
//            title: 'С НАСТУПАЮЩИМ НОВЫМ ГОДОМ! ',
//            icon: '/images/icons/kweather.png',
//            portletHeight: 300,
//            position: 'MainPanel-column-3',
//            launchModule: 'EC.Main.controller.Newyear'
        }];
        
        Ext.each(modulesToOpen, function(item) {
            MC.openModulePortlet(item);
        });
    },
    
    getMenu: function() {
        
        var MC = this.getController('App.controller.Main');
        
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
        }, {text: 'ЗАКАЗЫ-ПРОЕКТЫ (ДЕМО)',
            title: 'ЗАКАЗЫ-ПРОЕКТЫ (ДЕМО)',
            icon: '/images/icons/catalog.png',
            portletHeight: 370,
            position: 'MainPanel-column-2',
            launchModule: 'EC.CRM.controller.Demoprojects.Projects',
            helpURL: '/html/crm/demoprojects/help',
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
    }
});