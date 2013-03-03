Ext.define('EC.Catalog.controller.Main', {
    
    extend: 'App.controller.PortalAbstract',

    views: ['EC.Catalog.view.Layout'],
    
    init: function(container) {
        
        var MC = this.getController('App.controller.Main');
        
        if (container.down('CatalogPanel')) {
            container.down('CatalogPanel').show();
            return;
        }
        
        var menu = [{
            text: 'Кондиционирование',
            title: 'Каталог "Кондиционирование"',
            icon: '/images/icons/conditioning.png',
            portletHeight: 400,
            position: 'CatalogPanel-column-1',
            launchModule: 'EC.Catalog.controller.Conditioners',
            hidden: !acl.isView('catalog', 'conditioners')
        }, {
            text: 'Водоснабжение',
            title: 'Каталог "Водоснабжение"',
            icon: '/images/icons/water.png',
            portletHeight: 400,
            position: 'CatalogPanel-column-2',
            launchModule: 'EC.Catalog.controller.Watersupply',
            hidden: !acl.isView('catalog', 'watersupply')
        }, {
            text: 'Вентиляция',
            title: 'Каталог "Вентиляция"',
            icon: '/images/icons/cooling.png',
            portletHeight: 400,
            position: 'CatalogPanel-column-3',
            launchModule: 'EC.Catalog.controller.Airing',
            hidden: !acl.isView('catalog', 'airing')
        }, {
            text: 'Автоматика',
            title: 'Каталог "Автоматика"',
            icon: '/images/icons/automatic.png',
            portletHeight: 400,
            position: 'CatalogPanel-column-1',
            launchModule: 'EC.Catalog.controller.Automation',
            hidden: !acl.isView('catalog', 'automation')
        }, {
            text: 'Электрика',
            title: 'Каталог "Электрика"',
            icon: '/images/icons/electricity.png',
            portletHeight: 400,
            position: 'CatalogPanel-column-2',
            launchModule: 'EC.Catalog.controller.Electricity',
            hidden: !acl.isView('catalog', 'electricity')
        }, {
            text: 'Отопление',
            title: 'Каталог "Отопление"',
            icon: '/images/icons/heating.png',
            portletHeight: 400,
            position: 'CatalogPanel-column-3',
            launchModule: 'EC.Catalog.controller.Heating',
            hidden: !acl.isView('catalog', 'heating')
        }, {
            text: 'Пылеудаление',
            title: 'Каталог "Пылеудаление"',
            icon: '/images/icons/dust_filtering.png',
            portletHeight: 400,
            position: 'CatalogPanel-column-1',
            launchModule: 'EC.Catalog.controller.Dustextraction',
            hidden: !acl.isView('catalog', 'dustextraction')
        }];
        
        Ext.each(menu, function(item) {
            item.initConfig = item;
            item.handler = MC.openModulePortlet;
            item.scope = MC;
        }, this);
        
        this.mainPanel = container.add({
            xtype: 'CatalogPanel',
            closable: false,
            tbar: [{
                text: 'Каталог товаров',
                title: 'Каталог товаров',
                icon: '/images/icons/about.png',
                menu: menu
            }, {
                text: 'Каталог услуг',
                title: 'Каталог услуг',
                icon: '/images/icons/about.png'
            }, {
                text: 'Производители',
                title: 'Производители',
                icon: '/images/icons/about.png'
            }, {
                text: 'Создать свой подраздел',
                title: 'Создать свой подраздел',
                icon: '/images/icons/about.png'
            }],
            listeners: {
                show: function() {
                    var MC = this.getController('App.controller.Main');
                    MC.populateStaticMenu(this.getMenu());
                },
                scope: this
            }
        });
    },
    
    getMenu: function() {
        return [{
            text: 'Каталоги 1'
        }, {
            text: 'Каталоги 2'
        }];
    }
});