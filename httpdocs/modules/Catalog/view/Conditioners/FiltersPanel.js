Ext.define('EC.Catalog.view.Conditioners.FiltersPanel', {

    extend: 'EC.Catalog.view.FiltersPanelAbstarct',
    
    alias: ['widget.ConditionersFiltersPanel'],
    
    permissions: !acl.isUpdate('catalog', 'conditioners'),
    
    items: [{
        xtype: 'FilterMark'
    }, {
        xtype: 'ConditionersFilterGroup'
    }, {
        xtype: 'ConditionersFilterProductType'
    }, {
        xtype: 'ConditionersFilterImplementationType'
    }, {
        xtype: 'ConditionersFilterConnectionType'
    }, {
        xtype: 'ConditionersFilterProtectionType'
    }, {
        xtype: 'ConditionersFilterPowerSource'
    }, {
        xtype: 'ConditionersFilterMaterial'
    }, {
        xtype: 'ConditionersFilterControlType'
    }, {
        xtype: 'ConditionersFilterCountry'
    }]
    
});