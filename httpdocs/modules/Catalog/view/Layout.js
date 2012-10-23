Ext.define('EC.Catalog.view.Layout', {

    extend: 'Ext.tab.Panel',

    requires: ['xlib.portal.PortalPanel'],
    
    alias: 'widget.CatalogPanel',
    
    id: 'Catalogs-tab',
    
    title: 'Каталоги',

    tabPosition: 'bottom',
    
    closable: false,
    
    border: false,
    
    tbar: [{
        text: 'Кондиционирование',
        title: 'Каталог "Кондиционирование"',
        lunchModule: 'EC.Catalog.controller.Conditioners',
        hidden: !acl.isView('catalog', 'conditioners')
    }, {
        text: 'Водоснабжение',
        title: 'Каталог "Водоснабжение"',
        lunchModule: 'EC.Catalog.controller.Watersupply',
        hidden: !acl.isView('catalog', 'watersupply')
    }, {
        text: 'Вентиляция',
        title: 'Каталог "Вентиляция"',
        lunchModule: 'EC.Catalog.controller.Airing',
        hidden: !acl.isView('catalog', 'airing')
    }, {
        text: 'Автоматика',
        title: 'Каталог "Автоматика"',
        lunchModule: 'EC.Catalog.controller.Automation',
        hidden: !acl.isView('catalog', 'automation')
    }, {
        text: 'Электрика',
        title: 'Каталог "Электрика"',
        lunchModule: 'EC.Catalog.controller.Electricity',
        hidden: !acl.isView('catalog', 'electricity')
    }, {
        text: 'Отопление',
        title: 'Каталог "Отопление"',
        lunchModule: 'EC.Catalog.controller.Heating',
        hidden: !acl.isView('catalog', 'heating')
    }, {
        text: 'Пылеудаление',
        title: 'Каталог "Пылеудаление"',
        lunchModule: 'EC.Catalog.controller.Dustextraction',
        hidden: !acl.isView('catalog', 'dustextraction')
    }],
    
    defaults: {
        layout: 'fit',
        closable: true
    },
    
    items: [{
        id: 'portal-tab-1',
        title: 'Портал',
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