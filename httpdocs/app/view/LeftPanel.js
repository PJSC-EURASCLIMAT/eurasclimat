Ext.define('App.view.LeftPanel', {

    extend: 'Ext.Panel',
    
    alias: 'widget.LeftPanel',

    region: 'west',
    
    layout: 'border', 
    
    width: 150,
    
    baseCls: 'xlib-bkg',
    
    border: false,
    
    items: [{
        region: 'north',
        baseCls: 'xlib-bkg',
        height: 140, 
        items: [{
            xtype: 'image',
            src: '/images/logo.png',
            margin: '20 10'
        }]
    }, {
        region: 'center',
        baseCls: 'xlib-bkg',
        layout: {
            type: 'vbox',
            align: 'stretch'
        },
        padding: 5,
        defaultType: 'button',
        defaults: {
            margins: 5,
            textAlign: 'left'
        },
        items: [{
            xtype: 'label',
            text: 'Каталоги:',
            style: 'font-size: large;'
        }, {
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
        }]
    }]
});