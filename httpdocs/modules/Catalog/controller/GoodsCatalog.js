Ext.define('EC.Catalog.controller.GoodsCatalog', {
    
    extend: 'App.controller.PortalAbstract',

    views: ['EC.Catalog.view.GoodsCatalogLayout'],
    
    run: function(container) {
        this.getContainer(container);
        var MC = this.getController('App.controller.Main');
        container.on('show', function() {
            MC.openModulePortlet({
                text: 'КАТАЛОГ ТОВАРОВ',
                title: 'Каталог товаров',
                icon: '/images/icons/catalog.png',
                portletHeight: 400,
                position: 'CatalogPanel-column-1',
                launchModule: 'EC.Catalog.controller.Catalog',
                hidden: !acl.isView('catalog'),
                handler: function(b) {
                    MC.openModulePortlet(b.initialConfig);
                }
            });
            MC.openModulePortlet({
                text: 'КАТАЛОГ УСЛУГ',
                title: 'Каталог услуг',
                icon: '/images/icons/catalog.png',
                portletHeight: 400,
                position: 'CatalogPanel-column-2',
                launchModule: 'EC.Catalog.controller.Services',
                handler: function(b) {
                    MC.openModulePortlet(b.initialConfig);
                }
            });
        }, this);
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
            hidden: !acl.isView('catalog'),
            handler: function(b) {
                MC.openModulePortlet(b.initialConfig);
            }
        }, {
            text: 'КАТАЛОГ УСЛУГ',
            title: 'Каталог услуг',
            icon: '/images/icons/catalog.png',
            portletHeight: 400,
            position: 'CatalogPanel-column-2',
            launchModule: 'EC.Catalog.controller.Services',
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