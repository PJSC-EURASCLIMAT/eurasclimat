Ext.define('EC.Catalog.controller.Conditioning.Blocks', {
    
    extend: 'EC.Catalog.controller.Abstract',
    
    entity: 'Conditioning.Blocks',
    
    catalogName: 'Кондиционирование - Блоки',
    
    fields: [],
    
    showXType: 'ConditioningBlocksShow',
    
    fieldsURL: '/catalog/conditioning-blocks/get-fields',

    listURL: '/json/catalog/conditioning-blocks/get-list',
    
    getURL: '/json/catalog/conditioning-blocks/get',

    addURL: '/json/catalog/conditioning-blocks/add',
    
    updateURL: '/json/catalog/conditioning-blocks/update',
    
    deleteURL: '/json/catalog/conditioning-blocks/delete',
    
    uploadURL: '/json/catalog/conditioning-blocks/upload',
    
    getImagesURL: '/json/catalog/conditioning-blocks/get-images',
    
    deleteImageURL: '/json/catalog/conditioning-blocks/delete-image',
    
    getRelatedServicesURL: '/json/catalog/conditioning-blocks/get-related-services',
    
    addRelatedServicesURL: '/json/catalog/conditioning-blocks/add-related-services',
    
    editRelatedServicesURL: '/json/catalog/conditioning-blocks/edit-related-services',
    
    deleteRelatedServicesURL: '/json/catalog/conditioning-blocks/delete-related-services'

});