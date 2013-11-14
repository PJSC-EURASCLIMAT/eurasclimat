Ext.define('EC.Catalog.controller.Airing', {
    
    extend: 'EC.Catalog.controller.Abstract',
    
    stores: [
        'EC.Catalog.store.Airing'
    ],
    
    models: [
        'EC.Catalog.model.Airing'
    ],

    views: [
        'EC.Catalog.view.Airing.Layout',
        'EC.Catalog.view.Airing.FiltersPanel',
        'EC.Catalog.view.Airing.List',
        'EC.Catalog.view.Airing.Edit',
        'EC.Catalog.view.Airing.Show'
    ],
    
    uses: [
        'EC.Catalog.view.Airing.Filter.Group',
        'EC.Catalog.view.Airing.Filter.ProductType',
        'EC.Catalog.view.Airing.Filter.ImplementationType',
        'EC.Catalog.view.Airing.Filter.ControlType',
        'EC.Catalog.view.Airing.Filter.ConnectionType',
        'EC.Catalog.view.Airing.Filter.ProtectionType',
        'EC.Catalog.view.Airing.Filter.PowerSource',
        'EC.Catalog.view.Airing.Filter.Material',
        'EC.Catalog.view.Airing.Filter.IsolationClass',
        'EC.Catalog.view.Airing.Filter.Country'
    ],
    
    entity: 'airing',
    
    viewPermition: acl.isView('catalog', 'airing'),
    
    editPermition: acl.isUpdate('catalog', 'airing'),
    
    settingsView: 'EC.Catalog.view.Airing.SettingsLayout',
    
    catalogLayoutXType: 'AiringLayout', 
    
    filtersPanelXType: 'AiringFiltersPanel', 
    
    listXType: 'AiringList',
    
    showXType: 'AiringShow',
    
    editXType: 'AiringEdit',
    
    getURL: '/json/catalog/airing/get',
    
    addURL: '/json/catalog/airing/add',
    
    updateURL: '/json/catalog/airing/update',
    
    deleteURL: '/json/catalog/airing/delete',
    
    uploadURL: '/json/catalog/airing/upload',
    
    getImagesURL: '/json/catalog/airing/get-images',
    
    deleteImageURL: '/json/catalog/airing/delete-image',
    
    getRelatedServicesURL: '/json/catalog/airing/get-related-services',
    
    addRelatedServicesURL: '/json/catalog/airing/add-related-services',
    
    editRelatedServicesURL: '/json/catalog/airing/edit-related-services',
    
    deleteRelatedServicesURL: '/json/catalog/airing/delete-related-services'
    
});