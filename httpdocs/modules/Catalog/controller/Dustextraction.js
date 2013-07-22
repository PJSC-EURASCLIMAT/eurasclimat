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
        'EC.Catalog.view.Dustextraction.Edit',
        'EC.Catalog.view.Dustextraction.Show'
    ],
    
    uses: [
        'EC.Catalog.view.Dustextraction.Filter.Group',
        'EC.Catalog.view.Dustextraction.Filter.Motor',
        'EC.Catalog.view.Dustextraction.Filter.Filtration',
        'EC.Catalog.view.Dustextraction.Filter.Country'
    ],
    
    entity: 'dustextraction',
    
    viewPermition: acl.isView('catalog', 'dustextraction'),
    
    editPermition: acl.isUpdate('catalog', 'dustextraction'),
    
    settingsView: 'EC.Catalog.view.Dustextraction.SettingsLayout',
    
    catalogLayoutXType: 'DustextractionLayout', 
    
    filtersPanelXType: 'DustextractionFiltersPanel', 
    
    listXType: 'DustextractionList',
    
    showXType: 'DustextractionShow',
    
    editXType: 'DustextractionEdit',
    
    getURL: '/json/catalog/dustextraction/get',
    
    addURL: '/json/catalog/dustextraction/add',
    
    updateURL: '/json/catalog/dustextraction/update',
    
    deleteURL: '/json/catalog/dustextraction/delete',
    
    uploadURL: '/json/catalog/dustextraction/upload',
    
    getImagesURL: '/json/catalog/dustextraction/get-images',
    
    deleteImageURL: '/json/catalog/dustextraction/delete-image',
    
    getRelatedServicesURL: '/json/catalog/dustextraction/get-related-services',
    
    addRelatedServicesURL: '/json/catalog/dustextraction/add-related-services',
    
    deleteRelatedServicesURL: '/json/catalog/dustextraction/delete-related-services'
    
});