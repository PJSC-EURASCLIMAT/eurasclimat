Ext.define('App.controller.Interface.CRM.Catalogs', {
    
    extend: 'App.controller.PortalAbstract',

    views: ['App.view.Interface.CRM.Catalogs'],
    
    run: function(container) {
        
        var panel = this.getContainer(container);
        
        var MC = this.getController('App.controller.Main');
        
        panel.on('show', function() {
            MC.openModulePortlet({
                text: 'СПИСОК УСЛУГ',
                title: 'Список услуг',
                icon: '/images/icons/catalog.png',
                portletHeight: 400,
                position: 'CatalogPanel-column-1',
                launchModule: 'EC.Catalog.controller.Services'
            });
            MC.openModulePortlet({
                text: 'КАТАЛОГ ТОВАРОВ',
                title: 'Каталог товаров',
                icon: '/images/icons/catalog.png',
                portletHeight: 400,
                position: 'CatalogPanel-column-1',
                launchModule: 'EC.Catalog.controller.Catalog'
            });
            MC.openModulePortlet({
                text: 'КАТАЛОГ СПЕЦИАЛЬНЫХ УСЛУГ',
                title: 'Каталог специальных услуг',
                icon: '/images/icons/catalog.png',
                portletHeight: 400,
                position: 'CatalogPanel-column-2',
                launchModule: 'EC.Catalog.controller.SpecialServices'
            });
            MC.openModulePortlet({
                text: 'КАТАЛОГ ИНСТРУМЕНТОВ И МАТЕРИАЛОВ',
                title: 'Каталог инструментов и материалов',
                icon: '/images/icons/catalog.png',
                portletHeight: 400,
                position: 'CatalogPanel-column-2',
                launchModule: 'EC.Catalog.controller.Expendables'
            });
            MC.openModulePortlet({
                text: 'Услуги',
                title: 'Услуги',
                icon: '/images/icons/catalog.png',
                portletHeight: 400,
                position: 'CatalogPanel-column-3',
                launchModule: 'EC.Services.controller.Services'
            });
        }, this, {single: true});
    },
    
    getMenu: function() {
        
        var MC = this.getController('App.controller.Main');
        
        return [{
            text: 'КАТАЛОГ ТОВАРОВ',
            title: 'Каталог товаров',
            icon: '/images/icons/catalog.png',
            portletHeight: 400,
            position: 'CatalogPanel-column-1',
            launchModule: 'EC.Catalog.controller.Catalog',
            handler: function(b) {
                MC.openModulePortlet(b.initialConfig);
            }
        }, {
            text: 'СПИСОК УСЛУГ',
            title: 'Список услуг',
            icon: '/images/icons/catalog.png',
            portletHeight: 400,
            position: 'CatalogPanel-column-1',
            hidden: !acl.isView('admin'),
            launchModule: 'EC.Catalog.controller.Services',
            handler: function(b) {
                MC.openModulePortlet(b.initialConfig);
            }
        }, {
            text: 'КАТАЛОГ СПЕЦИАЛЬНЫХ УСЛУГ',
            title: 'Каталог услуг',
            icon: '/images/icons/catalog.png',
            portletHeight: 400,
            position: 'CatalogPanel-column-2',
            launchModule: 'EC.Catalog.controller.SpecialServices',
            handler: function(b) {
                MC.openModulePortlet(b.initialConfig);
            }
        }, {
            text: 'КАТАЛОГ ИНСТРУМЕНТОВ И МАТЕРИАЛОВ',
            title: 'Каталог инструментов и материалов',
            icon: '/images/icons/catalog.png',
            portletHeight: 400,
            position: 'CatalogPanel-column-3',
            launchModule: 'EC.Catalog.controller.Expendables',
            handler: function(b) {
                MC.openModulePortlet(b.initialConfig);
            }
        }, {
            text: 'Кондиционирование',
            title: 'Каталог "Кондиционирование"',
            icon: '/images/icons/conditioning.png',
            portletHeight: 400,
            position: 'CatalogPanel-column-1',
            launchModule: 'EC.Catalog.controller.Conditioners',
            hidden: !acl.isView('catalog', 'conditioners'),
            handler: function(b) {
                MC.openModulePortlet(b.initialConfig);
            }
        }, {
            text: 'Водоснабжение',
            title: 'Каталог "Водоснабжение"',
            icon: '/images/icons/water.png',
            portletHeight: 400,
            position: 'CatalogPanel-column-2',
            launchModule: 'EC.Catalog.controller.Watersupply',
            hidden: !acl.isView('catalog', 'watersupply'),
            handler: function(b) {
                MC.openModulePortlet(b.initialConfig);
            }
        }, {
            text: 'Вентиляция',
            title: 'Каталог "Вентиляция"',
            icon: '/images/icons/cooling.png',
            portletHeight: 400,
            position: 'CatalogPanel-column-3',
            launchModule: 'EC.Catalog.controller.Airing',
            hidden: !acl.isView('catalog', 'airing'),
            handler: function(b) {
                MC.openModulePortlet(b.initialConfig);
            }
        }, {
            text: 'Автоматика',
            title: 'Каталог "Автоматика"',
            icon: '/images/icons/automatic.png',
            portletHeight: 400,
            position: 'CatalogPanel-column-1',
            launchModule: 'EC.Catalog.controller.Automation',
            hidden: !acl.isView('catalog', 'automation'),
            handler: function(b) {
                MC.openModulePortlet(b.initialConfig);
            }
        }, {
            text: 'Электрика',
            title: 'Каталог "Электрика"',
            icon: '/images/icons/electricity.png',
            portletHeight: 400,
            position: 'CatalogPanel-column-2',
            launchModule: 'EC.Catalog.controller.Electricity',
            hidden: !acl.isView('catalog', 'electricity'),
            handler: function(b) {
                MC.openModulePortlet(b.initialConfig);
            }
        }, {
            text: 'Отопление',
            title: 'Каталог "Отопление"',
            icon: '/images/icons/heating.png',
            portletHeight: 400,
            position: 'CatalogPanel-column-3',
            launchModule: 'EC.Catalog.controller.Heating',
            hidden: !acl.isView('catalog', 'heating'),
            handler: function(b) {
                MC.openModulePortlet(b.initialConfig);
            }
        }, {
            text: 'Пылеудаление',
            title: 'Каталог "Пылеудаление"',
            icon: '/images/icons/dust_filtering.png',
            portletHeight: 400,
            position: 'CatalogPanel-column-1',
            launchModule: 'EC.Catalog.controller.Dustextraction',
            hidden: !acl.isView('catalog', 'dustextraction'),
            handler: function(b) {
                MC.openModulePortlet(b.initialConfig);
            }
        }];
    }
});