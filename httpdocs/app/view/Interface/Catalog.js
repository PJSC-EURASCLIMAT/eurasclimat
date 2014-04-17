Ext.define('App.view.Interface.Catalog', {

    extend: 'App.view.PortalLayoutAbstarct',

    alias: 'widget.MainCatalogPanel',
    
    title: 'Каталог товаров',
    
    layout: 'fit',
    
    icon: '/images/icons/catalog.png',
    
    items: [{
        title: 'Панель виджетов',
        xtype: 'portalpanel',
        border: false,
        closable: false,
        columns: 3,
        items: [{
            id: 'MainPanelCatalog-column-1'
        }, {
            id: 'MainPanelCatalog-column-2'
        }, {
            id: 'MainPanelCatalog-column-3'
        }]
    }]
});