Ext.define('EC.Catalog.controller.Conditioning.Blocks', {
    
    extend: 'EC.Catalog.controller.Abstract',
    
    views: [
        'EC.Catalog.view.Conditioning.Blocks.FiltersPanel',
        'EC.Catalog.view.Conditioning.Blocks.Show'
    ],
    
    /*
    uses: [
        'EC.Catalog.view.Conditioners.Filter.Group',
        'EC.Catalog.view.Conditioners.Filter.ProductType',
        'EC.Catalog.view.Conditioners.Filter.ImplementationType',
        'EC.Catalog.view.Conditioners.Filter.PowerSource',
        'EC.Catalog.view.Conditioners.Filter.HeatingCooling'
    ],
    */
    
    entity: 'Conditioning.Blocks',
    
    catalogName: 'Кондиционирование - Блоки',
    
    fields: [],
    
    settingsView: 'EC.Catalog.view.Conditioning.Blocks.SettingsLayout',
    
    filtersPanelXType: 'ConditioningBlocksFiltersPanel', 
    
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