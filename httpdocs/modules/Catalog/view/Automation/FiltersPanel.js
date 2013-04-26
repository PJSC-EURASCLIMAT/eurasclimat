Ext.define('EC.Catalog.view.Automation.FiltersPanel', {

    extend: 'EC.Catalog.view.FiltersPanelAbstarct',
    
    alias: ['widget.AutomationFiltersPanel'],
    
    permissions: !acl.isUpdate('catalog', 'automation'),
        
    items: [{
        xtype: 'FilterMark'
    }, {
        xtype: 'AutomationFilterGroup'
    }, {
        xtype: 'AutomationFilterProductType'
    }, {
        xtype: 'AutomationFilterImplementationType'
    }, {
        xtype: 'AutomationFilterConnectionType'
    }, {
        xtype: 'AutomationFilterProtectionType'
    }, {
        xtype: 'AutomationFilterPowerSource'
    }, {
        xtype: 'AutomationFilterMaterial'
    }, {
        xtype: 'AutomationFilterControlType'
    }, {
        xtype: 'AutomationFilterIsolationType'
    }, {
        xtype: 'AutomationFilterCountry'
    }]
    
});