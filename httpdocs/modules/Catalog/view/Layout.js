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
            id: 'CatalogPanel-column-1'
        }, {
            id: 'CatalogPanel-column-2'
        }, {
            id: 'CatalogPanel-column-3'
        }]
    }]
});