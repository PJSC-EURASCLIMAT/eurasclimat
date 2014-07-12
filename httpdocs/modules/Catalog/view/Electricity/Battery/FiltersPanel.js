Ext.define('EC.Catalog.view.Electricity.Battery.FiltersPanel', {

    extend: 'EC.Catalog.view.FiltersPanelAbstarct',
    
    alias: ['widget.ElectricityBatteryFiltersPanel'],
    
    permissions: !acl.isUpdate('catalog', 'electricity'),
        
    items: [{
        xtype: 'FilterMark'
    }]

});