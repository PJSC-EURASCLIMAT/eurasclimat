Ext.define('EC.Catalog.view.CatalogLayout', {
    
    extend: 'Ext.panel.Panel',
    
    layout: 'border',
    
    border: false,
    
    items: [{
        xtype: 'CatalogTree',
        region: 'west',
        width: 170
    }, {
        xtype: 'panel',
        type: 'preview',
        layout: 'fit',
        region: 'center',
        items: [{
            xtype: 'panel',
            layout: 'fit',
            bodyPadding: 25,
            autoScroll: true,
            border: false,
            style: 'text-align: justify;',
            html: 'Выберите каталог в меню слева'
        }]
    }]
});