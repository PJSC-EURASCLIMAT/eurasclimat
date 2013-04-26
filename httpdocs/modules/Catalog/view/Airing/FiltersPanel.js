Ext.define('EC.Catalog.view.Airing.FiltersPanel', {

    extend: 'EC.Catalog.view.FiltersPanelAbstarct',
    
    alias: ['widget.AiringFiltersPanel'],
    
    permissions: !acl.isUpdate('catalog', 'airing'),
        
    items: [{
        xtype: 'FilterMark'
    }, {
        xtype: 'AiringFilterGroup'
    }, {
        xtype: 'AiringFilterProductType'
    }, {
        xtype: 'AiringFilterImplementationType'
    }, {
        xtype: 'AiringFilterConnectionType'
    }, {
        xtype: 'AiringFilterProtectionType'
    }, {
        xtype: 'AiringFilterPowerSource'
    }, {
        xtype: 'AiringFilterMaterial'
    }, {
        xtype: 'AiringFilterControlType'
    }, {
        xtype: 'AiringFilterIsolationClass'
    }, {
        xtype: 'AiringFilterCountry'
    }]
        
});