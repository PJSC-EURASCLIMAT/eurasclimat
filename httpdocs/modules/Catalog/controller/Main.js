Ext.define('EC.Catalog.controller.Main', {
    
    extend: 'App.controller.PortalAbstract',

    init: function(container) {
        
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
        }, this);
        
        this.mainPanel = container.add({
            xtype: 'CatalogPanel',
            tbar: menu
        });
        this.mainPanel.show();
        
        this.control({
            'CatalogPanel > toolbar button': {
                click: this.openModulePortlet,
                scope: this
            },
            'CatalogPanel portlet': {
                restore: this.openModuleTab,
                maximize: this.openModuleFullscreen,
                scope: this
            }
        });
    }
});