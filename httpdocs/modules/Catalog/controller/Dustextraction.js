Ext.define('EC.Catalog.controller.Dustextraction', {
    
    extend: 'EC.Catalog.controller.Abstract',
    
    stores: [
        'EC.Catalog.store.Dustextraction'
    ],
    
    models: [
        'EC.Catalog.model.Dustextraction'
    ],

    views: [
        'EC.Catalog.view.Dustextraction.Layout',
        'EC.Catalog.view.Dustextraction.FiltersPanel',
        'EC.Catalog.view.Dustextraction.List',
        'EC.Catalog.view.Dustextraction.Edit'
    ],
    
    uses: [
        'EC.Catalog.view.Dustextraction.Filter.Mark',
        'EC.Catalog.view.Dustextraction.Filter.Group',
        'EC.Catalog.view.Dustextraction.Filter.Motor',
        'EC.Catalog.view.Dustextraction.Filter.Filtration',
        'EC.Catalog.view.Dustextraction.Filter.Country'
    ],
    
    viewPermition: acl.isView('catalog', 'dustextraction'),
    
    editPermition: acl.isUpdate('catalog', 'dustextraction'),
    
    settingsView: 'EC.Catalog.view.Dustextraction.SettingsLayout',
    
    catalogLayoutXType: 'DustextractionLayout', 
    
    filtersPanelXType: 'DustextractionFiltersPanel', 
    
    listXType: 'DustextractionList',
    
    editXType: 'DustextractionEdit',
    
    addURL: '/json/catalog/dustextraction/add',
    
    updateURL: '/json/catalog/dustextraction/update',
    
    deleteURL: '/json/catalog/dustextraction/delete'
    
});