Ext.define('EC.Catalog.store.CatalogTree', {

    extend: 'Ext.data.TreeStore',
   
    model: 'EC.Catalog.model.CatalogTree',
    
    root: {
        expanded: true,
        children: [{
            id: 'Conditioning',
            name: 'Кондиционирование',
            icon: '/images/icons/conditioning.png',
            hidden: !acl.isView('catalog', 'conditioners'),
            children: [{
                id: 'Conditioning.Blocks',
                name: 'Кондиционирование - Блоки',
                children: []
            }, {
                id: 'Conditioning.Controllers',
                name: 'Кондиционирование - Системы управления',
                children: []
            }]
        }, {
            id: 'Airing',
            name: 'Вентиляция',
            icon: '/images/icons/cooling.png',
            hidden: !acl.isView('catalog', 'airing'),
            children: [{
                id: 'Airing.Blocks',
                name: 'Вентиляция - Блоки',
                children: []
            }]
        }, {
            id: 'Automation',
            name: 'Автоматика',
            icon: '/images/icons/automatic.png',
            hidden: !acl.isView('catalog', 'automation'),
            children: []
        }, {
            id: 'Electricity',
            name: 'Электрика',
            icon: '/images/icons/electricity.png',
            hidden: !acl.isView('catalog', 'electricity'),
            children: [{
                id: 'Electricity.Battery',
                name: 'Электрика - Батареи',
                children: []
            }, {
                id: 'Electricity.Isolation',
                name: 'Электрика - Изоляция',
                children: []
            }, {
                id: 'Electricity.Lamp',
                name: 'Электрика - Лампы',
                children: []
            }, {
                id: 'Electricity.Wires',
                name: 'Электрика - Провода',
                children: []
            }]
        }, {
            id: 'Heating',
            name: 'Отопление',
            icon: '/images/icons/heating.png',
            hidden: !acl.isView('catalog', 'heating'),
            children: []
        }, {
            id: 'Watersupply',
            name: 'Водоснабжение',
            icon: '/images/icons/water.png',
            hidden: !acl.isView('catalog', 'watersupply'),
            children: []
        }, {
            id: 'Dustextraction',
            name: 'Пылеудаление',
            icon: '/images/icons/dust_filtering.png',
            hidden: !acl.isView('catalog', 'dustextraction'),
            children: []
        }]
    },
    
    proxy: {
        type: 'ajax',
        url: '/json/catalog/get-tree'
    }

});