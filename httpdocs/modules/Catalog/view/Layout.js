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
        title: 'Кондиционирование'
    }, {
        title: 'Вентиляция'
    }, {
        title: 'Автоматика'
    }]
    
});