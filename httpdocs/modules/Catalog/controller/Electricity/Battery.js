Ext.define('EC.Catalog.controller.Electricity.Battery', {
    
    extend: 'EC.Catalog.controller.Abstract',
    
//    views: [
//        'EC.Catalog.view.Conditioners.FiltersPanel',
//        'EC.Catalog.view.Conditioners.Show'
//    ],
//    
//    uses: [
//        'EC.Catalog.view.Conditioners.Filter.Group',
//        'EC.Catalog.view.Conditioners.Filter.ProductType',
//        'EC.Catalog.view.Conditioners.Filter.ImplementationType',
//        'EC.Catalog.view.Conditioners.Filter.PowerSource',
//        'EC.Catalog.view.Conditioners.Filter.HeatingCooling'
//    ],
    
    entity: 'Electricity.Battery',
    
    fields: [],
    
    settingsView: 'EC.Catalog.view.Electricity.Battery.SettingsLayout',
    
    filtersPanelXType: 'ConditionersBatteryFiltersPanel', 
    
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