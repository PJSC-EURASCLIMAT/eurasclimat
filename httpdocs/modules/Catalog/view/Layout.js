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
        launchModule: 'EC.Catalog.controller.Conditioners',
        hidden: !acl.isView('catalog', 'conditioners')
    }, {
        text: 'Водоснабжение',
        title: 'Каталог "Водоснабжение"',
        launchModule: 'EC.Catalog.controller.Watersupply',
        hidden: !acl.isView('catalog', 'watersupply')
    }, {
        text: 'Вентиляция',
        title: 'Каталог "Вентиляция"',
        launchModule: 'EC.Catalog.controller.Airing',
        hidden: !acl.isView('catalog', 'airing')
    }, {
        text: 'Автоматика',
        title: 'Каталог "Автоматика"',
        launchModule: 'EC.Catalog.controller.Automation',
        hidden: !acl.isView('catalog', 'automation')
    }, {
        text: 'Электрика',
        title: 'Каталог "Электрика"',
        launchModule: 'EC.Catalog.controller.Electricity',
        hidden: !acl.isView('catalog', 'electricity')
    }, {
        text: 'Отопление',
        title: 'Каталог "Отопление"',
        launchModule: 'EC.Catalog.controller.Heating',
        hidden: !acl.isView('catalog', 'heating')
    }, {
        text: 'Пылеудаление',
        title: 'Каталог "Пылеудаление"',
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