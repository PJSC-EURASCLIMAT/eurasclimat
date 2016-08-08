Ext.define('EC.Catalog.controller.Electricity.Lamp', {
    
    extend: 'EC.Catalog.controller.Abstract',

    entity: 'Electricity.Lamp',
    
    catalogName: 'Электрика - Лампы',
    
    fields: [],
    
    showXType: 'ElectricityLampShow',
    
    fieldsURL: '/catalog/electricity-lamp/get-fields',

    listURL: '/json/catalog/electricity-lamp/get-list',
    
    getURL: '/json/catalog/electricity-lamp/get',

    addURL: '/json/catalog/electricity-lamp/add',
    
    updateURL: '/json/catalog/electricity-lamp/update',
    
    deleteURL: '/json/catalog/electricity-lamp/delete',
    
    uploadURL: '/json/catalog/electricity-lamp/upload',
    
    getImagesURL: '/json/catalog/electricity-lamp/get-images',
    
    deleteImageURL: '/json/catalog/electricity-lamp/delete-image',
    
    getRelatedServicesURL: '/json/catalog/electricity-lamp/get-related-services',
    
    addRelatedServicesURL: '/json/catalog/electricity-lamp/add-related-services',
    
    editRelatedServicesURL: '/json/catalog/electricity-lamp/edit-related-services',
    
    deleteRelatedServicesURL: '/json/catalog/electricity-lamp/delete-related-services'

});