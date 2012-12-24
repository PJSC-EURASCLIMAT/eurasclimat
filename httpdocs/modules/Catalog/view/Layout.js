Ext.define('EC.Catalog.view.Layout', {

    extend: 'Ext.tab.Panel',

    requires: ['xlib.portal.PortalPanel'],
    
    alias: 'widget.CatalogPanel',
    
    id: 'Catalogs-tab',
    
    title: 'Каталоги',
    
    icon: '/images/icons/catalogue.png',

    tabPosition: 'bottom',
    
    closable: true,
    
    border: false,
    
    tbar: [{
        text: 'Кондиционирование',
        title: 'Каталог "Кондиционирование"',
        icon: '/images/icons/conditioning.png',
        launchModule: 'EC.Catalog.controller.Conditioners',
        hidden: !acl.isView('catalog', 'conditioners')
    }, {
        text: 'Водоснабжение',
        title: 'Каталог "Водоснабжение"',
        icon: '/images/icons/water.png',
        launchModule: 'EC.Catalog.controller.Watersupply',
        hidden: !acl.isView('catalog', 'watersupply')
    }, {
        text: 'Вентиляция',
        title: 'Каталог "Вентиляция"',
        icon: '/images/icons/cooling.png',
        launchModule: 'EC.Catalog.controller.Airing',
        hidden: !acl.isView('catalog', 'airing')
    }, {
        text: 'Автоматика',
        title: 'Каталог "Автоматика"',
        icon: '/images/icons/automatic.png',
        launchModule: 'EC.Catalog.controller.Automation',
        hidden: !acl.isView('catalog', 'automation')
    }, {
        text: 'Электрика',
        title: 'Каталог "Электрика"',
        icon: '/images/icons/electricity.png',
        launchModule: 'EC.Catalog.controller.Electricity',
        hidden: !acl.isView('catalog', 'electricity')
    }, {
        text: 'Отопление',
        title: 'Каталог "Отопление"',
        icon: '/images/icons/heating.png',
        launchModule: 'EC.Catalog.controller.Heating',
        hidden: !acl.isView('catalog', 'heating')
    }, {
        text: 'Пылеудаление',
        title: 'Каталог "Пылеудаление"',
        icon: '/images/icons/dust_filtering.png',
        launchModule: 'EC.Catalog.controller.Dustextraction',
        hidden: !acl.isView('catalog', 'dustextraction')
    }],
    
    defaults: {
        layout: 'fit',
        closable: true
    },
    
    items: [{
        title: 'Рабочий стол',
        xtype: 'portalpanel',
        border: false,
        closable: false,
        columns: 3,
        items: [{
        }, {
        }, {
        }]
    }]
});