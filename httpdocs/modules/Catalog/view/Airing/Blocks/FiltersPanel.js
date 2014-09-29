Ext.define('EC.Catalog.view.Airing.Blocks.FiltersPanel', {

    extend: 'EC.Catalog.view.FiltersPanelAbstarct',
    
    alias: ['widget.AiringBlocksFiltersPanel'],
    
    permissions: !acl.isUpdate('catalog', 'airing'),
        
    items: [{
        xtype: 'FilterMark'
//    }, {
//        xtype: 'AiringFilterGroup'
//    }, {
//        xtype: 'AiringFilterProductType'
//    }, {
//        xtype: 'AiringFilterImplementationType'
//    }, {
//        xtype: 'AiringFilterConnectionType'
//    }, {
//        xtype: 'AiringFilterProtectionType'
//    }, {
//        xtype: 'AiringFilterPowerSource'
//    }, {
//        xtype: 'AiringFilterMaterial'
//    }, {
//        xtype: 'AiringFilterControlType'
//    }, {
//        xtype: 'AiringFilterIsolationClass'
//    }, {
//        xtype: 'AiringFilterCountry'
    }]
        
});