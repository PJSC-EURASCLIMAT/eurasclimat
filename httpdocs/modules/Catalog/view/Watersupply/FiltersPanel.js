Ext.define('EC.Catalog.view.Watersupply.FiltersPanel', {

    extend: 'EC.Catalog.view.FiltersPanelAbstarct',
    
    alias: ['widget.WatersupplyFiltersPanel'],
    
    permissions: !acl.isUpdate('catalog', 'watersupply'),
        
    items: [{
        xtype: 'WatersupplyFilterMark'
    }, {
        xtype: 'WatersupplyFilterGroup'
    }, {
        xtype: 'WatersupplyFilterProductType'
    }, {
        xtype: 'WatersupplyFilterImplementationType'
    }, {
        xtype: 'WatersupplyFilterConnectionType'
    }, {
        xtype: 'WatersupplyFilterProtectionType'
    }, {
        xtype: 'WatersupplyFilterPowerSource'
    }, {
        xtype: 'WatersupplyFilterMaterial'
    }, {
        xtype: 'WatersupplyFilterControlType'
    }, {
        xtype: 'WatersupplyFilterCountry'
    }]

});