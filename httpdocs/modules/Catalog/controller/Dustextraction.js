Ext.define('EC.Catalog.controller.Dustextraction', {
    
    extend: 'EC.Catalog.controller.Abstract',
    
    views: [
        'EC.Catalog.view.Dustextraction.FiltersPanel',
        'EC.Catalog.view.Dustextraction.Edit',
        'EC.Catalog.view.Dustextraction.Show'
    ],
    
    uses: [
        'EC.Catalog.view.Dustextraction.Filter.Group',
        'EC.Catalog.view.Dustextraction.Filter.Motor',
        'EC.Catalog.view.Dustextraction.Filter.Filtration',
        'EC.Catalog.view.Dustextraction.Filter.Country'
    ],
    
    entity: 'Dustextraction',
    
    settingsView: 'EC.Catalog.view.Dustextraction.SettingsLayout',
    
    filtersPanelXType: 'DustextractionFiltersPanel', 
    
    showXType: 'DustextractionShow',
    
    editXType: 'DustextractionEdit',
    
    listURL: '/json/catalog/dustextraction/get-list',
    
    getURL: '/json/catalog/dustextraction/get',
    
    addURL: '/json/catalog/dustextraction/add',
    
    updateURL: '/json/catalog/dustextraction/update',
    
    deleteURL: '/json/catalog/dustextraction/delete',
    
    uploadURL: '/json/catalog/dustextraction/upload',
    
    getImagesURL: '/json/catalog/dustextraction/get-images',
    
    deleteImageURL: '/json/catalog/dustextraction/delete-image',
    
    getRelatedServicesURL: '/json/catalog/dustextraction/get-related-services',
    
    addRelatedServicesURL: '/json/catalog/dustextraction/add-related-services',
    
    editRelatedServicesURL: '/json/catalog/dustextraction/edit-related-services',
    
    deleteRelatedServicesURL: '/json/catalog/dustextraction/delete-related-services'
    
});