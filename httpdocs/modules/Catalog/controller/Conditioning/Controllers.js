Ext.define('EC.Catalog.controller.Conditioning.Controllers', {
    
    extend: 'EC.Catalog.controller.Abstract',
    
    views: [
        'EC.Catalog.view.Conditioning.Controllers.FiltersPanel',
        'EC.Catalog.view.Conditioning.Controllers.Show'
    ],
    
    entity: 'Conditioning.Controllers',
    
    catalogName: 'Кондиционирование - Системы управления',
    
    fields: [],
    
    settingsView: 'EC.Catalog.view.Conditioning.Controllers.SettingsLayout',
    
    filtersPanelXType: 'ConditioningControllersFiltersPanel', 
    
    showXType: 'ConditioningControllersShow',
    
    fieldsURL: '/catalog/conditioning-controllers/get-fields',

    listURL: '/json/catalog/conditioning-controllers/get-list',
    
    getURL: '/json/catalog/conditioning-controllers/get',

    addURL: '/json/catalog/conditioning-controllers/add',
    
    updateURL: '/json/catalog/conditioning-controllers/update',
    
    deleteURL: '/json/catalog/conditioning-controllers/delete',
    
    uploadURL: '/json/catalog/conditioning-controllers/upload',
    
    getImagesURL: '/json/catalog/conditioning-controllers/get-images',
    
    deleteImageURL: '/json/catalog/conditioning-controllers/delete-image',
    
    getRelatedServicesURL: '/json/catalog/conditioning-controllers/get-related-services',
    
    addRelatedServicesURL: '/json/catalog/conditioning-controllers/add-related-services',
    
    editRelatedServicesURL: '/json/catalog/conditioning-controllers/edit-related-services',
    
    deleteRelatedServicesURL: '/json/catalog/conditioning-controllers/delete-related-services'

});