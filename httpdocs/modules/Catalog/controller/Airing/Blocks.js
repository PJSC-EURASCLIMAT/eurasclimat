Ext.define('EC.Catalog.controller.Airing.Blocks', {
    
    extend: 'EC.Catalog.controller.Abstract',

    views: [
        'EC.Catalog.view.Airing.Blocks.FiltersPanel',
        'EC.Catalog.view.Airing.Blocks.Show'
    ],
    
    /*
    uses: [
        'EC.Catalog.view.Airing.Filter.Group',
        'EC.Catalog.view.Airing.Filter.ProductType',
        'EC.Catalog.view.Airing.Filter.ImplementationType',
        'EC.Catalog.view.Airing.Filter.ControlType',
        'EC.Catalog.view.Airing.Filter.ConnectionType',
        'EC.Catalog.view.Airing.Filter.ProtectionType',
        'EC.Catalog.view.Airing.Filter.PowerSource',
        'EC.Catalog.view.Airing.Filter.Material',
        'EC.Catalog.view.Airing.Filter.IsolationClass'
    ],
    */
    
    entity: 'Airing.Blocks',
    
    catalogName: 'Вентиляция - Блоки',
    
    fields: [],
    
    settingsView: 'EC.Catalog.view.Airing.Blocks.SettingsLayout',
    
    filtersPanelXType: 'AiringBlocksFiltersPanel', 
    
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