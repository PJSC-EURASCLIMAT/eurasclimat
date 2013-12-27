Ext.define('App.controller.Interface.Main.About', {
    
    extend: 'App.controller.PortalAbstract',

    views: ['App.view.Interface.Main.About'],
    
    run: function(container) {

        this.getContainer(container);
        var MC = this.getController('App.controller.Main');

        var modulesToOpen = [{
            title: 'Производителям',
            icon: '/images/icons/4manufacturers.png',
            position: 'MainPanel-column-2',
            portletHeight: 200,
            allowMultiple: true,
            launchModule: 'EC.Main.controller.ForManufacturers'
        }, {
            title: 'Заказчикам',
            icon: '/images/icons/4clients.png',
            position: 'MainPanel-column-2',
            portletHeight: 200,
            allowMultiple: true,
            launchModule: 'EC.Main.controller.ForCustomers'
        }, {
            title: 'Контрагентам',
            icon: '/images/icons/4specialists.png',
            position: 'MainPanel-column-2',
            portletHeight: 200,
            allowMultiple: true,
            launchModule: 'EC.Main.controller.ForSpecialists'
        }, {
            title: 'О компании',
            icon: '/images/icons/about.png',
            position: 'MainPanel-column-2',
            portletHeight: 200,
            allowMultiple: false,
            launchModule: 'EC.Main.controller.AboutCompany'
//        }, {
//            title: 'Минибраузер',
//            icon: '/images/icons/sys_dev.png',
//            portletHeight: 410,
//            position: 'MainPanel-column-1',
//            launchModule: 'EC.Main.controller.MiniBrowser'
        }, {
            title: 'О системе',
            icon: '/images/icons/sys_dev.png',
            portletHeight: 410,
            position: 'MainPanel-column-1',
            launchModule: 'EC.Main.controller.AboutSystem'
        }, {
            title: 'Каталог специалистов',
            icon: '/images/icons/sys_dev.png',
            portletHeight: 340,
            position: 'MainPanel-column-1',
            launchModule: 'EC.Experts.controller.ActiveExperts'
        }, {
            title: 'Заказ',
            icon: '/images/icons/sys_dev.png',
            portletHeight: 340,
            position: 'MainPanel-column-1',
            launchModule: 'EC.Main.controller.Order'
        }, {
            title: 'Курсы валют',
            icon: '/images/icons/cur_exch.png',
            portletHeight: 200,
            position: 'MainPanel-column-3',
            launchModule: 'EC.Main.controller.Currency'
        }, {
            title: 'Новости',
            icon: '/images/icons/news.png',
            portletHeight: 200,
            position: 'MainPanel-column-3',
            launchModule: 'EC.Main.controller.News'
        }, {
            title: 'Прогноз погоды',
            icon: '/images/icons/kweather.png',
            portletHeight: 410,
            position: 'MainPanel-column-3',
            launchModule: 'EC.Main.controller.Weather'
        }, {
            title: 'С НАСТУПАЮЩИМ НОВЫМ ГОДОМ! ',
            icon: '/images/icons/kweather.png',
            portletHeight: 300,
            position: 'MainPanel-column-3',
            launchModule: 'EC.Main.controller.Newyear'
        }];
        
//            modulesToOpen.push({
//            });
//            
//            modulesToOpen.push({
//            });
//            modulesToOpen.push({
//            });
        
        Ext.each(modulesToOpen, function(item) {
            MC.openModulePortlet(item);
        });
    },
    
    getMenu: function() {
        
        var MC = this.getController('App.controller.Main');
        
//        return [{
//            text: 'О компании',
//            title: 'О компании',
//            icon: '/images/icons/about.png',
//            position: 'MainPanel-column-2',
//            portletHeight: 200,
//            allowMultiple: false,
//            launchModule: 'EC.Main.controller.AboutCompany',
//            handler: function(b) {
//                MC.openModulePortlet(b.initialConfig);
//            }
//        }, {
//            text: 'Заказ',
//            title: 'Заказ',
//            icon: '/images/icons/about.png',
//            position: 'MainPanel-column-2',
//            portletHeight: 200,
//            allowMultiple: false,
//            launchModule: 'EC.Main.controller.Order',
//            handler: function(b) {
//                MC.openModulePortlet(b.initialConfig);
//            }
//        }, {
//            text: 'О системе',
//            title: 'О системе',
//            icon: '/images/icons/sys_dev.png',
//            portletHeight: 410,
//            position: 'MainPanel-column-1',
//            launchModule: 'EC.Main.controller.AboutSystem',
//            handler: function(b) {
//                MC.openModulePortlet(b.initialConfig);
//            }
//        }, {
//            text: 'Производителям',
//            title: 'Производителям',
//            icon: '/images/icons/4manufacturers.png',
//            position: 'MainPanel-column-2',
//            portletHeight: 200,
//            allowMultiple: false,
//            launchModule: 'EC.Main.controller.ForManufacturers',
//            handler: function(b) {
//                MC.openModulePortlet(b.initialConfig);
//            }
//        }, {
//            text: 'Заказчикам',
//            title: 'Заказчикам',
//            icon: '/images/icons/4clients.png',
//            position: 'MainPanel-column-2',
//            portletHeight: 200,
//            allowMultiple: false,
//            launchModule: 'EC.Main.controller.ForCustomers',
//            handler: function(b) {
//                MC.openModulePortlet(b.initialConfig);
//            }
//        }, {
//            text: 'Контрагентам',
//            title: 'Контрагентам',
//            icon: '/images/icons/4specialists.png',
//            position: 'MainPanel-column-2',
//            portletHeight: 200,
//            allowMultiple: false,
//            launchModule: 'EC.Main.controller.ForSpecialists',
//            handler: function(b) {
//                MC.openModulePortlet(b.initialConfig);
//            }
//        }, {
//            text: 'Новости',
//            title: 'Новости',
//            icon: '/images/icons/news.png',
//            position: 'MainPanel-column-1',
//            portletHeight: 210,
//            launchModule: 'EC.Main.controller.News',
//            handler: function(b) {
//                MC.openModulePortlet(b.initialConfig);
//            }
//        }];
    }
});