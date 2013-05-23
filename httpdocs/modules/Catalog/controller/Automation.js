Ext.define('EC.Catalog.controller.Automation', {
    
    extend: 'EC.Catalog.controller.Abstract',
    
    stores: [
        'EC.Catalog.store.Automation'
    ],
    
    models: [
        'EC.Catalog.model.Automation'
    ],

    views: [
        'EC.Catalog.view.Automation.Layout',
        'EC.Catalog.view.Automation.FiltersPanel',
        'EC.Catalog.view.Automation.List',
        'EC.Catalog.view.Automation.Edit'
    ],
    
    uses: [
        'EC.Catalog.view.Automation.Filter.Group',
        'EC.Catalog.view.Automation.Filter.ProductType',
        'EC.Catalog.view.Automation.Filter.ImplementationType',
        'EC.Catalog.view.Automation.Filter.ControlType',
        'EC.Catalog.view.Automation.Filter.ConnectionType',
        'EC.Catalog.view.Automation.Filter.ProtectionType',
        'EC.Catalog.view.Automation.Filter.PowerSource',
        'EC.Catalog.view.Automation.Filter.Material',
        'EC.Catalog.view.Automation.Filter.IsolationType',
        'EC.Catalog.view.Automation.Filter.Country'
    ],
    
    viewPermition: acl.isView('catalog', 'automation'),
    
    editPermition: acl.isUpdate('catalog', 'automation'),
    
    settingsView: 'EC.Catalog.view.Automation.SettingsLayout',
    
    catalogLayoutXType: 'AutomationLayout', 
    
    filtersPanelXType: 'AutomationFiltersPanel', 
    
    listXType: 'AutomationList',
    
    editXType: 'AutomationEdit',
    
    getURL: '/json/catalog/automation/get',
    
    addURL: '/json/catalog/automation/add',
    
    updateURL: '/json/catalog/automation/update',
    
    deleteURL: '/json/catalog/automation/delete',
    
    uploadURL: '/json/catalog/automation/upload',
    
    getImagesURL: '/json/catalog/automation/get-images',
    
    deleteImageURL: '/json/catalog/automation/delete-image'
    
});