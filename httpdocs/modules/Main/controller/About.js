Ext.define('EC.Main.controller.About', {
    
    extend: 'App.controller.PortalAbstract',

    views: ['EC.Main.view.About.Layout'],
    
    init: function() {
    
        this.callParent(arguments);
        
        var MC = this.getController('App.controller.Main');
        
        var modulesToOpen = [{
//            title: 'Специалисты',
//            icon: '/images/icons/worker.png',
//            portletHeight: 300,
//            position: 'MainPanel-column-1',
//            launchModule: 'EC.Main.controller.Workers'
//        }, {
//            title: 'Производители',
//            icon: '/images/icons/partners.png',
//            portletHeight: 200,
//            position: 'MainPanel-column-1',
//            launchModule: 'EC.Main.controller.Manufacturers'
//        }, {
            title: 'Производителям',
            icon: '/images/icons/about.png',
            position: 'MainPanel-column-2',
            portletHeight: 200,
            allowMultiple: true,
            launchModule: 'EC.Main.controller.ForManufacturers'
        }, {
            title: 'Заказчикам',
            icon: '/images/icons/about.png',
            position: 'MainPanel-column-2',
            portletHeight: 200,
            allowMultiple: true,
            launchModule: 'EC.Main.controller.ForCustomers'
        }, {
            title: 'Специалистам',
            icon: '/images/icons/about.png',
            position: 'MainPanel-column-2',
            portletHeight: 200,
            allowMultiple: true,
            launchModule: 'EC.Main.controller.ForSpecialists'
        }, {
            title: 'Новости',
            icon: '/images/icons/news_list.png',
            portletHeight: 210,
            position: 'MainPanel-column-1',
            launchModule: 'EC.Main.controller.News'
        },{
            title: 'Разработка системы',
            icon: '/images/icons/about.png',
            portletHeight: 410,
            position: 'MainPanel-column-1',
            launchModule: 'EC.Main.controller.Sysdev'
        },{
            title: 'Курсы валют',
            icon: '/images/icons/cur_exch.png',
            portletHeight: 200,
            position: 'MainPanel-column-3',
            launchModule: 'EC.Main.controller.Currency'
        },{
            title: 'Прогноз погоды',
            icon: '/images/icons/kweather.png',
            portletHeight: 300,
            position: 'MainPanel-column-3',
            launchModule: 'EC.Main.controller.Weather'
        }];
        
        Ext.each(modulesToOpen, function(item) {
            MC.openModulePortlet(item);
        });
    },
    
    getMenu: function() {
        
        var MC = this.getController('App.controller.Main');
        
        return [{
            text: 'Производителям',
            title: 'Производителям',
            icon: '/images/icons/about.png',
            position: 'MainPanel-column-2',
            portletHeight: 200,
            allowMultiple: true,
            launchModule: 'EC.Main.controller.ForManufacturers',
            handler: function(b) {
                MC.openModulePortlet(b.initialConfig);
            }
        }, {
            text: 'Заказчикам',
            title: 'Заказчикам',
            icon: '/images/icons/about.png',
            position: 'MainPanel-column-2',
            portletHeight: 200,
            allowMultiple: true,
            launchModule: 'EC.Main.controller.ForCustomers',
            handler: function(b) {
                MC.openModulePortlet(b.initialConfig);
            }
        }, {
            text: 'Специалистам',
            title: 'Специалистам',
            icon: '/images/icons/about.png',
            position: 'MainPanel-column-2',
            portletHeight: 200,
            allowMultiple: true,
            launchModule: 'EC.Main.controller.ForSpecialists',
            handler: function(b) {
                MC.openModulePortlet(b.initialConfig);
            }
        }];
    }
});