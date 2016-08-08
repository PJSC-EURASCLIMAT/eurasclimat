Ext.define('EC.Catalog.view.CatalogLayout', {
    
    extend: 'Ext.panel.Panel',
    
    layout: 'border',
    
    border: false,
    
    title: 'Каталог товаров',
    
    frame: true,
    
    items: [{
        xtype: 'CatalogTree',
        region: 'west',
        width: 200,
        split: true,
        collapsible: true
    }, {
        xtype: 'panel',
        type: 'preview',
        layout: 'fit',
        region: 'center',
        split: true,
        border: false,
        items: [{
            xtype: 'panel',
            layout: 'fit',
            bodyPadding: 25,
            autoScroll: true,
            style: 'text-align: justify;',
            html: 'Выберите каталог в меню слева'
        }]
    }]
});