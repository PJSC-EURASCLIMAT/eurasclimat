Ext.define('EC.Catalog.view.GoodsCatalogLayout', {

    extend: 'App.view.PortalLayoutAbstarct',

    title: 'Каталог товаров и услуг',
    
    icon: '/images/icons/catalog.png',
    
    items: [{
        title: 'Панель виджетов',
        xtype: 'portalpanel',
        border: false,
        closable: false,
        columns: 3,
        items: [{
            id: 'CatalogPanel-column-1'
        }, {
            id: 'CatalogPanel-column-2'
        }, {
            id: 'CatalogPanel-column-3'
        }]
    }]

});