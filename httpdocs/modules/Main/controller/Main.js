Ext.define('EC.Main.controller.Main', {
    
    extend: 'App.controller.PortalAbstract',

    views: [
        'EC.Main.view.Layout'
    ],
    
    init: function(container) {
        
        var MC = this.getController('App.controller.Main');
        
        if (container.down('MainPanel')) {
            container.down('MainPanel').show();
            return;
        }
        
        var menu = [{
//            text: 'Специалисты',
//            title: 'Специалисты',
//            icon: '/images/icons/worker.png',
//            portletHeight: 300,
//            position: 'MainPanel-column-1',
//            launchModule: 'EC.Main.controller.Workers'
//        }, {
//            text: 'Производители',
//            title: 'Производители',
//            icon: '/images/icons/partners.png',
//            portletHeight: 200,
//            position: 'MainPanel-column-1',
//            launchModule: 'EC.Main.controller.Manufacturers'
//        }, {
            text: 'Производителям',
            title: 'Производителям',
            icon: '/images/icons/about.png',
            position: 'MainPanel-column-2',
            portletHeight: 200,
            allowMultiple: true,
            launchModule: 'EC.Main.controller.ForManufacturers'
        }, {
            text: 'Заказчикам',
            title: 'Заказчикам',
            icon: '/images/icons/about.png',
            position: 'MainPanel-column-2',
            portletHeight: 200,
            allowMultiple: true,
            launchModule: 'EC.Main.controller.ForCustomers'
        }, {
            text: 'Специалистам',
            title: 'Специалистам',
            icon: '/images/icons/about.png',
            position: 'MainPanel-column-2',
            portletHeight: 200,
            allowMultiple: true,
            launchModule: 'EC.Main.controller.ForSpecialists'
        }, {
            text: 'Проекты',
            title: 'Проекты',
            icon: '/images/icons/about.png'
        }, {
            text: 'Конкурсы',
            title: 'Конкурсы',
            icon: '/images/icons/about.png'
        }, {
            text: 'Создать свой подраздел',
            title: 'Создать свой подраздел',
            icon: '/images/icons/about.png'
        }];
        
        Ext.each(menu, function(item) {
            item.initConfig = item;
        }, this);
        
        container.add({
            xtype: 'MainPanel',
            tbar: menu,
            listeners: {
                show: function() {
                    var MC = this.getController('App.controller.Main');
                    MC.populateStaticMenu(this.getMenu());
                },
                scope: this
            }
        });

        this.control({
            'MainPanel > toolbar button': {
                click: MC.openModulePortlet
            }
        });
        
        Ext.each(menu, function(item) {
            MC.openModulePortlet(item);
        });
        
        Ext.each(Ext.ComponentQuery.query('TopPanel button[action=allwidgets] menuitem'), function(item) {
            MC.openModulePortlet(item);
        });
        
        MC.populateStaticMenu(this.getMenu());
    },
    
    getMenu: function() {
        return [{
            text: 'Главная 1'
        }, {
            text: 'Главная 2'
        }, {
            text: 'Главная 3'
        }];
    }
});