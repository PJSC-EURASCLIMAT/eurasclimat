Ext.define('EC.Catalog.view.Heating.FiltersPanel', {

    extend: 'EC.Catalog.view.FiltersPanelAbstarct',
    
    alias: ['widget.HeatingFiltersPanel'],
    
    permissions: !acl.isUpdate('catalog', 'heating'),
        
    items: [{
        xtype: 'HeatingFilterMark'
    }, {
        xtype: 'HeatingFilterGroup'
    }, {
        xtype: 'HeatingFilterProductType'
    }, {
        xtype: 'HeatingFilterImplementationType'
    }, {
        xtype: 'HeatingFilterConnectionType'
    }, {
        xtype: 'HeatingFilterProtectionType'
    }, {
        xtype: 'HeatingFilterPowerSource'
    }, {
        xtype: 'HeatingFilterMaterial'
    }, {
        xtype: 'HeatingFilterControlType'
    }, {
        xtype: 'HeatingFilterCountry'
    }]

});