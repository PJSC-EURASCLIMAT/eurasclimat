Ext.define('EC.Catalog.store.CatalogTree', {

    extend: 'Ext.data.TreeStore',
   
    model: 'EC.Catalog.model.CatalogTree',
    
    root: {
        expanded: true,
        children: [{
            id: 'Conditioners',
            name: 'Кондиционирование',
            icon: '/images/icons/conditioning.png',
            hidden: !acl.isView('catalog', 'conditioners')
        }, {
            id: 'Watersupply',
            name: 'Водоснабжение',
            icon: '/images/icons/water.png',
            hidden: !acl.isView('catalog', 'watersupply')
        }, {
            id: 'Airing',
            name: 'Вентиляция',
            icon: '/images/icons/cooling.png',
            hidden: !acl.isView('catalog', 'airing')
        }, {
            id: 'Automation',
            name: 'Автоматика',
            icon: '/images/icons/automatic.png',
            hidden: !acl.isView('catalog', 'automation')
        }, {
            id: 'Electricity',
            name: 'Электрика',
            icon: '/images/icons/electricity.png',
            hidden: !acl.isView('catalog', 'electricity')
        }, {
            id: 'Heating',
            name: 'Отопление',
            icon: '/images/icons/heating.png',
            hidden: !acl.isView('catalog', 'heating')
        }, {
            id: 'Dustextraction',
            name: 'Пылеудаление',
            icon: '/images/icons/dust_filtering.png',
            hidden: !acl.isView('catalog', 'dustextraction')
        }]
    },
    
    proxy: {
        type: 'ajax',
        url: '/json/catalog/get-tree'
    }

});