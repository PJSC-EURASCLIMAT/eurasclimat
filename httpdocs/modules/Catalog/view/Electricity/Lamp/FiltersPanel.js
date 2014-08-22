Ext.define('EC.Catalog.view.Electricity.Lamp.FiltersPanel', {

    extend: 'EC.Catalog.view.FiltersPanelAbstarct',
    
    alias: ['widget.ElectricityLampFiltersPanel'],
    
    permissions: !acl.isUpdate('catalog', 'electricity'),
        
    items: [{
        xtype: 'FilterMark'
    }]

});