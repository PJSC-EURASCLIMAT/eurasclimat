Ext.define('EC.Catalog.view.Airing.Layout', {

    extend: 'Ext.panel.Panel',
   
    alias: ['widget.AiringLayout'],
    
    layout: 'border',
    
    border: false,
    
    items: [{
        xtype: 'AiringFiltersPanel',
        region: 'north'
    }, {
        xtype: 'AiringList',
        region: 'center'
    }]
});