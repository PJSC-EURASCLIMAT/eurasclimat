Ext.define('EC.Catalog.store.CatalogTree', {

    extend: 'Ext.data.TreeStore',
   
    model: 'EC.Catalog.model.CatalogTree',
    
    root: {
        expanded: true,
        children: [{
            id: 'Conditioners',
            name: 'Кондиционирование',
            icon: '/images/icons/conditioning.png',
            hidden: !acl.isView('catalog', 'conditioners'),
            children: []
        }, {
            id: 'Watersupply',
            name: 'Водоснабжение',
            icon: '/images/icons/water.png',
            hidden: !acl.isView('catalog', 'watersupply'),
            children: []
        }, {
            id: 'Airing',
            name: 'Вентиляция',
            icon: '/images/icons/cooling.png',
            hidden: !acl.isView('catalog', 'airing'),
            children: []
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
                name: 'Батареи',
                children: []
            }, {
                id: 'Electricity.Isolation',
                name: 'Изоляция',
                children: []
            }, {
                id: 'Electricity.Lamp',
                name: 'Лампы',
                children: []
            }, {
                id: 'Electricity.Wires',
                name: 'Провода',
                children: []
            }]
        }, {
            id: 'Heating',
            name: 'Отопление',
            icon: '/images/icons/heating.png',
            hidden: !acl.isView('catalog', 'heating'),
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