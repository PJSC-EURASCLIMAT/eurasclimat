Ext.define('EC.Catalog.view.Electricity.Wires.FiltersPanel', {

    extend: 'EC.Catalog.view.FiltersPanelAbstarct',
    
    alias: ['widget.ElectricityWiresFiltersPanel'],
    
    permissions: !acl.isUpdate('catalog', 'electricity'),
        
    items: [{
        xtype: 'FilterMark'
    }]

});