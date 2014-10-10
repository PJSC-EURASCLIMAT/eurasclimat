Ext.define('EC.Catalog.controller.Electricity.Battery', {
    
    extend: 'EC.Catalog.controller.Abstract',
    
    views: [
        'EC.Catalog.view.Electricity.Battery.FiltersPanel'
    ],

    entity: 'Electricity.Battery',
    
    catalogName: 'Электрика - Батареи',
    
    fields: [],
    
    settingsView: 'EC.Catalog.view.Electricity.Battery.SettingsLayout',
    
    filtersPanelXType: 'ElectricityBatteryFiltersPanel', 
    
    showXType: 'ElectricityBatteryShow',
    
    fieldsURL: '/catalog/electricity-battery/get-fields',

    listURL: '/json/catalog/electricity-battery/get-list',
    
    getURL: '/json/catalog/electricity-battery/get',

    addURL: '/json/catalog/electricity-battery/add',
    
    updateURL: '/json/catalog/electricity-battery/update',
    
    deleteURL: '/json/catalog/electricity-battery/delete',
    
    uploadURL: '/json/catalog/electricity-battery/upload',
    
    getImagesURL: '/json/catalog/electricity-battery/get-images',
    
    deleteImageURL: '/json/catalog/electricity-battery/delete-image',
    
    getRelatedServicesURL: '/json/catalog/electricity-battery/get-related-services',
    
    addRelatedServicesURL: '/json/catalog/electricity-battery/add-related-services',
    
    editRelatedServicesURL: '/json/catalog/electricity-battery/edit-related-services',
    
    deleteRelatedServicesURL: '/json/catalog/electricity-battery/delete-related-services'

});