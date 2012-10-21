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
        'EC.Catalog.view.Airing.Edit'
    ],
    
    uses: [
        'EC.Catalog.view.Airing.Filter.Mark',
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
    
    viewPermition: acl.isView('catalog', 'airing'),
    
    editPermition: acl.isUpdate('catalog', 'airing'),
    
    settingsView: 'EC.Catalog.view.Airing.SettingsLayout',
    
    catalogLayoutXType: 'AiringLayout', 
    
    filtersPanelXType: 'AiringFiltersPanel', 
    
    listXType: 'AiringList',
    
    editXType: 'AiringEdit',
    
    addURL: '/json/catalog/airing/add',
    
    updateURL: '/json/catalog/airing/update',
    
    deleteURL: '/json/catalog/airing/delete'
    
});