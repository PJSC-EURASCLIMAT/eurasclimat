Ext.define('EC.Catalog.view.Layout', {

    extend: 'Ext.tab.Panel',
   
    alias: ['widget.CatalogLayout'],
    
    title: 'Каталог',
    
    defaults: {
        layout: 'fit',
        border: false,
        closable: false
    },
    
    items: [{
        xtype: 'ConditionersList',
        title: 'Кондиционирование'
    }, {
        title: 'Вентиляция'
    }, {
        title: 'Автоматика'
    }]
    
});