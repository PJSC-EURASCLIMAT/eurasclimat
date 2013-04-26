Ext.define('EC.Catalog.controller.Conditioners', {
    
    extend: 'EC.Catalog.controller.Abstract',
    
    stores: [
        'EC.Catalog.store.Conditioners'
    ],
    
    models: [
        'EC.Catalog.model.Conditioners'
    ],

    views: [
        'EC.Catalog.view.Conditioners.Layout',
        'EC.Catalog.view.Conditioners.FiltersPanel',
        'EC.Catalog.view.Conditioners.List',
        'EC.Catalog.view.Conditioners.Edit'
    ],
    
    uses: [
        'EC.Catalog.view.Conditioners.Filter.Group',
        'EC.Catalog.view.Conditioners.Filter.ProductType',
        'EC.Catalog.view.Conditioners.Filter.ImplementationType',
        'EC.Catalog.view.Conditioners.Filter.ControlType',
        'EC.Catalog.view.Conditioners.Filter.ConnectionType',
        'EC.Catalog.view.Conditioners.Filter.ProtectionType',
        'EC.Catalog.view.Conditioners.Filter.PowerSource',
        'EC.Catalog.view.Conditioners.Filter.Material',
        'EC.Catalog.view.Conditioners.Filter.Country'
    ],
    
    viewPermition: acl.isView('catalog', 'conditioners'),
    
    editPermition: acl.isUpdate('catalog', 'conditioners'),
    
    settingsView: 'EC.Catalog.view.Conditioners.SettingsLayout',
    
    catalogLayoutXType: 'ConditionersLayout', 
    
    filtersPanelXType: 'ConditionersFiltersPanel', 
    
    listXType: 'ConditionersList',
    
    editXType: 'ConditionersEdit',
    
    getURL: '/json/catalog/conditioners/get',

    addURL: '/json/catalog/conditioners/add',
    
    updateURL: '/json/catalog/conditioners/update',
    
    deleteURL: '/json/catalog/conditioners/delete',
    
    uploadURL: '/json/catalog/conditioners/upload',
    
    getImagesURL: '/json/catalog/conditioners/get-images'

});