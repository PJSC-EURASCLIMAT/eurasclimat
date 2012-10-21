Ext.define('EC.Catalog.controller.Heating', {
    
    extend: 'EC.Catalog.controller.Abstract',
    
    stores: [
        'EC.Catalog.store.Heating'
    ],
    
    models: [
        'EC.Catalog.model.Heating'
    ],

    views: [
        'EC.Catalog.view.Heating.Layout',
        'EC.Catalog.view.Heating.FiltersPanel',
        'EC.Catalog.view.Heating.List',
        'EC.Catalog.view.Heating.Edit'
    ],
    
    uses: [
        'EC.Catalog.view.Heating.Filter.Mark',
        'EC.Catalog.view.Heating.Filter.Group',
        'EC.Catalog.view.Heating.Filter.ProductType',
        'EC.Catalog.view.Heating.Filter.ImplementationType',
        'EC.Catalog.view.Heating.Filter.ControlType',
        'EC.Catalog.view.Heating.Filter.ConnectionType',
        'EC.Catalog.view.Heating.Filter.ProtectionType',
        'EC.Catalog.view.Heating.Filter.PowerSource',
        'EC.Catalog.view.Heating.Filter.Material',
        'EC.Catalog.view.Heating.Filter.Country'
    ],
    
    viewPermition: acl.isView('catalog', 'heating'),
    
    editPermition: acl.isUpdate('catalog', 'heating'),
    
    settingsView: 'EC.Catalog.view.Heating.SettingsLayout',
    
    catalogLayoutXType: 'HeatingLayout', 
    
    filtersPanelXType: 'HeatingFiltersPanel', 
    
    listXType: 'HeatingList',
    
    editXType: 'HeatingEdit',
    
    addURL: '/json/catalog/heating/add',
    
    updateURL: '/json/catalog/heating/update',
    
    deleteURL: '/json/catalog/heating/delete'
    
});