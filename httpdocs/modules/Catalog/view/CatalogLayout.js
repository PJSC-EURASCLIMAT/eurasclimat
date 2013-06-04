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
        bodyPadding: 5,
        autoScroll: true,
        layout: 'fit',
        region: 'center'
    }]
});