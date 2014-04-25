Ext.define('EC.Catalog.controller.Conditioners', {
    
    extend: 'EC.Catalog.controller.Abstract',
    
    views: [
        'EC.Catalog.view.Conditioners.FiltersPanel',
        'EC.Catalog.view.Conditioners.Edit',
        'EC.Catalog.view.Conditioners.Show'
    ],
    
    uses: [
        'EC.Catalog.view.Conditioners.Filter.Group',
        'EC.Catalog.view.Conditioners.Filter.ProductType',
        'EC.Catalog.view.Conditioners.Filter.ImplementationType',
        'EC.Catalog.view.Conditioners.Filter.PowerSource',
        'EC.Catalog.view.Conditioners.Filter.HeatingCooling',
        'EC.Catalog.view.Conditioners.Filter.Currency',
        'EC.Catalog.view.Conditioners.Filter.Country'
    ],
    
    entity: 'Conditioners',
    
    settingsView: 'EC.Catalog.view.Conditioners.SettingsLayout',
    
    filtersPanelXType: 'ConditionersFiltersPanel', 
    
    showXType: 'ConditionersShow',
    
    editXType: 'ConditionersEdit',
    
    listURL: '/json/catalog/conditioners/get-list',
    
    getURL: '/json/catalog/conditioners/get',

    addURL: '/json/catalog/conditioners/add',
    
    updateURL: '/json/catalog/conditioners/update',
    
    deleteURL: '/json/catalog/conditioners/delete',
    
    uploadURL: '/json/catalog/conditioners/upload',
    
    getImagesURL: '/json/catalog/conditioners/get-images',
    
    deleteImageURL: '/json/catalog/conditioners/delete-image',
    
    getRelatedServicesURL: '/json/catalog/conditioners/get-related-services',
    
    addRelatedServicesURL: '/json/catalog/conditioners/add-related-services',
    
    editRelatedServicesURL: '/json/catalog/conditioners/edit-related-services',
    
    deleteRelatedServicesURL: '/json/catalog/conditioners/delete-related-services'

});