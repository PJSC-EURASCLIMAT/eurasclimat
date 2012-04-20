Ext.define('EC.Catalog.view.Layout', {

    extend: 'Ext.tab.Panel',
   
    alias: ['widget.CatalogLayout'],
    
    title: 'Каталог',
    
    defaults: {
        layout: 'fit',
        xtype: 'CatalogList',
        border: false,
        closable: false
    },
    
    items: [{
        id: 'catalog-tab-1',
        title: 'Кондиционирование'
    }, {
        id: 'catalog-tab-2',
        title: 'Вентиляция'
    }, {
        id: 'catalog-tab-3',
        title: 'Автоматика'
    }]
    
});