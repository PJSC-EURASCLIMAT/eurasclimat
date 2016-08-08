Ext.define('EC.Catalog.controller.Airing.Blocks', {
    
    extend: 'EC.Catalog.controller.Abstract',

    entity: 'Airing.Blocks',
    
    catalogName: 'Вентиляция - Блоки',
    
    fields: [],
    
    showXType: 'AiringBlocksShow',
    
    fieldsURL: '/catalog/airing-blocks/get-fields',
    
    listURL: '/json/catalog/airing-blocks/get-list',
    
    getURL: '/json/catalog/airing-blocks/get',
    
    addURL: '/json/catalog/airing-blocks/add',
    
    updateURL: '/json/catalog/airing-blocks/update',
    
    deleteURL: '/json/catalog/airing-blocks/delete',
    
    uploadURL: '/json/catalog/airing-blocks/upload',
    
    getImagesURL: '/json/catalog/airing-blocks/get-images',
    
    deleteImageURL: '/json/catalog/airing-blocks/delete-image',
    
    getRelatedServicesURL: '/json/catalog/airing-blocks/get-related-services',
    
    addRelatedServicesURL: '/json/catalog/airing-blocks/add-related-services',
    
    editRelatedServicesURL: '/json/catalog/airing-blocks/edit-related-services',
    
    deleteRelatedServicesURL: '/json/catalog/airing-blocks/delete-related-services'
    
});