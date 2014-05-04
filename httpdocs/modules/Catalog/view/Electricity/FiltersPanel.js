Ext.define('EC.Catalog.view.Electricity.FiltersPanel', {

    extend: 'EC.Catalog.view.FiltersPanelAbstarct',
    
    alias: ['widget.ElectricityFiltersPanel'],
    
    permissions: !acl.isUpdate('catalog', 'electricity'),
        
    items: [{
        xtype: 'FilterMark'
//    }, {
//        xtype: 'ElectricityFilterGroup'
//    }, {
//        xtype: 'ElectricityFilterProductType'
//    }, {
//        xtype: 'ElectricityFilterImplementationType'
//    }, {
//        xtype: 'ElectricityFilterConnectionType'
//    }, {
//        xtype: 'ElectricityFilterProtectionType'
//    }, {
//        xtype: 'ElectricityFilterPowerSource'
//    }, {
//        xtype: 'ElectricityFilterMaterial'
//    }, {
//        xtype: 'ElectricityFilterControlType'
//    }, {
//        xtype: 'ElectricityFilterIsolationType'
//    }, {
//        xtype: 'ElectricityFilterCountry'
    }]

});