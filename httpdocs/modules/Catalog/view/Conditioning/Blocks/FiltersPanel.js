Ext.define('EC.Catalog.view.Conditioning.Blocks.FiltersPanel', {

    extend: 'EC.Catalog.view.FiltersPanelAbstarct',
    
    alias: ['widget.ConditionersFiltersPanel'],
    
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