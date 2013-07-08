Ext.define('EC.Catalog.controller.Watersupply', {
    
    extend: 'EC.Catalog.controller.Abstract',
    
    stores: [
        'EC.Catalog.store.Watersupply'
    ],
    
    models: [
        'EC.Catalog.model.Watersupply'
    ],

    views: [
        'EC.Catalog.view.Watersupply.Layout',
        'EC.Catalog.view.Watersupply.FiltersPanel',
        'EC.Catalog.view.Watersupply.List',
        'EC.Catalog.view.Watersupply.Edit',
        'EC.Catalog.view.Watersupply.Show'
    ],
    
    uses: [
        'EC.Catalog.view.Watersupply.Filter.Group',
        'EC.Catalog.view.Watersupply.Filter.ProductType',
        'EC.Catalog.view.Watersupply.Filter.ImplementationType',
        'EC.Catalog.view.Watersupply.Filter.ControlType',
        'EC.Catalog.view.Watersupply.Filter.ConnectionType',
        'EC.Catalog.view.Watersupply.Filter.ProtectionType',
        'EC.Catalog.view.Watersupply.Filter.PowerSource',
        'EC.Catalog.view.Watersupply.Filter.Material',
        'EC.Catalog.view.Watersupply.Filter.Country'
    ],
    
    viewPermition: acl.isView('catalog', 'watersupply'),
    
    editPermition: acl.isUpdate('catalog', 'watersupply'),
    
    settingsView: 'EC.Catalog.view.Watersupply.SettingsLayout',
    
    catalogLayoutXType: 'WatersupplyLayout', 
    
    filtersPanelXType: 'WatersupplyFiltersPanel', 
    
    listXType: 'WatersupplyList',
    
    showXType: 'WatersupplyShow',
    
    editXType: 'WatersupplyEdit',
    
    getURL: '/json/catalog/watersupply/get',
    
    addURL: '/json/catalog/watersupply/add',
    
    updateURL: '/json/catalog/watersupply/update',
    
    deleteURL: '/json/catalog/watersupply/delete',
    
    uploadURL: '/json/catalog/watersupply/upload',
    
    getImagesURL: '/json/catalog/watersupply/get-images',
    
    deleteImageURL: '/json/catalog/watersupply/delete-image',
    
    getRelatedServicesURL: '/json/catalog/watersupply/get-related-services',
    
    addRelatedServicesURL: '/json/catalog/watersupply/add-related-services',
    
    deleteRelatedServicesURL: '/json/catalog/watersupply/delete-related-services'
    
});