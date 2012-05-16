Ext.define('EC.Catalog.view.Layout', {

    extend: 'Ext.tab.Panel',
   
    alias: ['widget.CatalogLayout'],
    
    layout: 'fit',
    
    border: false,
    
    defaults: {
        border: false,
        closable: false
    },
    
    items: [{
        xtype: 'ConditionersLayout',
        title: 'Кондиционирование'
    }, {
        title: 'Вентиляция'
    }, {
        title: 'Автоматика'
    }]
    
});