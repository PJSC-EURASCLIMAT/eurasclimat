Ext.define('EC.Catalog.view.Electricity.Isolation.FiltersPanel', {

    extend: 'EC.Catalog.view.FiltersPanelAbstarct',
    
    alias: ['widget.ElectricityIsolationFiltersPanel'],
    
    permissions: !acl.isUpdate('catalog', 'electricity'),
        
    items: [{
        xtype: 'FilterMark'
    }]

});