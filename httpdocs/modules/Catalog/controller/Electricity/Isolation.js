Ext.define('EC.Catalog.controller.Electricity.Isolation', {
    
    extend: 'EC.Catalog.controller.Abstract',

    entity: 'Electricity.Isolation',
    
    catalogName: 'Электрика - Изоляция',
    
    fields: [],
    
    showXType: 'ElectricityIsolationShow',
    
    fieldsURL: '/catalog/electricity-isolation/get-fields',

    listURL: '/json/catalog/electricity-isolation/get-list',
    
    getURL: '/json/catalog/electricity-isolation/get',

    addURL: '/json/catalog/electricity-isolation/add',
    
    updateURL: '/json/catalog/electricity-isolation/update',
    
    deleteURL: '/json/catalog/electricity-isolation/delete',
    
    uploadURL: '/json/catalog/electricity-isolation/upload',
    
    getImagesURL: '/json/catalog/electricity-isolation/get-images',
    
    deleteImageURL: '/json/catalog/electricity-isolation/delete-image',
    
    getRelatedServicesURL: '/json/catalog/electricity-isolation/get-related-services',
    
    addRelatedServicesURL: '/json/catalog/electricity-isolation/add-related-services',
    
    editRelatedServicesURL: '/json/catalog/electricity-isolation/edit-related-services',
    
    deleteRelatedServicesURL: '/json/catalog/electricity-isolation/delete-related-services'

});