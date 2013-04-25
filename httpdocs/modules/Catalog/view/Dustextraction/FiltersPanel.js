Ext.define('EC.Catalog.view.Dustextraction.FiltersPanel', {

    extend: 'EC.Catalog.view.FiltersPanelAbstarct',
    
    alias: ['widget.DustextractionFiltersPanel'],
    
    permissions: !acl.isUpdate('catalog', 'dustextraction'),
        
    items: [{
        xtype: 'DustextractionFilterMark'
    }, {
        xtype: 'DustextractionFilterGroup'
    }, {
        xtype: 'DustextractionFilterFiltration'
    }, {
        xtype: 'DustextractionFilterMotor'
    }, {
        xtype: 'DustextractionFilterCountry'
    }]
        
});