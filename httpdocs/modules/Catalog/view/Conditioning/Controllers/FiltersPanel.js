Ext.define('EC.Catalog.view.Conditioning.Controls.FiltersPanel', {

    extend: 'EC.Catalog.view.FiltersPanelAbstarct',
    
    alias: ['widget.ConditioningControlsFiltersPanel'],
    
    permissions: !acl.isUpdate('catalog', 'conditioners'),
    
    items: [{
        xtype: 'FilterMark'
//    }, {
//        xtype: 'ConditionersFilterGroup'
//    }, {
//        xtype: 'ConditionersFilterProductType'
//    }, {
//        xtype: 'ConditionersFilterImplementationType'
//    }, {
//        xtype: 'ConditionersFilterHeatingCooling'
//    }, {
//        xtype: 'ConditionersFilterPowerSource'
//    }, {
//        xtype: 'ConditionersFilterCountry'
//    }, {
//        xtype: 'ConditionersFilterCurrency',
//        hidden: true
    }]
    
});