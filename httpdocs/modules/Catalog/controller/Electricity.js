Ext.define('EC.Catalog.controller.Electricity', {
    
    extend: 'EC.Catalog.controller.Abstract',
    
    stores: [
        'EC.Catalog.store.Electricity'
    ],
    
    models: [
        'EC.Catalog.model.Electricity'
    ],

    views: [
        'EC.Catalog.view.Electricity.Layout',
        'EC.Catalog.view.Electricity.FiltersPanel',
        'EC.Catalog.view.Electricity.List',
        'EC.Catalog.view.Electricity.Edit'
    ],
    
    uses: [
        'EC.Catalog.view.Electricity.Filter.Group',
        'EC.Catalog.view.Electricity.Filter.ProductType',
        'EC.Catalog.view.Electricity.Filter.ImplementationType',
        'EC.Catalog.view.Electricity.Filter.ControlType',
        'EC.Catalog.view.Electricity.Filter.ConnectionType',
        'EC.Catalog.view.Electricity.Filter.ProtectionType',
        'EC.Catalog.view.Electricity.Filter.PowerSource',
        'EC.Catalog.view.Electricity.Filter.Material',
        'EC.Catalog.view.Electricity.Filter.IsolationType',
        'EC.Catalog.view.Electricity.Filter.Country'
    ],
    
    viewPermition: acl.isView('catalog', 'electricity'),
    
    editPermition: acl.isUpdate('catalog', 'electricity'),
    
    settingsView: 'EC.Catalog.view.Electricity.SettingsLayout',
    
    catalogLayoutXType: 'ElectricityLayout', 
    
    filtersPanelXType: 'ElectricityFiltersPanel', 
    
    listXType: 'ElectricityList',
    
    editXType: 'ElectricityEdit',
    
    getURL: '/json/catalog/electricity/get',
    
    addURL: '/json/catalog/electricity/add',
    
    updateURL: '/json/catalog/electricity/update',
    
    deleteURL: '/json/catalog/electricity/delete',
    
    uploadURL: '/json/catalog/electricity/upload',
    
    getImagesURL: '/json/catalog/electricity/get-images',
    
    deleteImageURL: '/json/catalog/electricity/delete-image'
    
});