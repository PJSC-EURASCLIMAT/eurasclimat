Ext.define('EC.Catalog.controller.Automation', {
    
    extend: 'EC.Catalog.controller.Abstract',
    
    views: [
        'EC.Catalog.view.Automation.FiltersPanel',
        'EC.Catalog.view.Automation.Edit',
        'EC.Catalog.view.Automation.Show'
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
    
    entity: 'Automation',
    
    settingsView: 'EC.Catalog.view.Automation.SettingsLayout',
    
    filtersPanelXType: 'AutomationFiltersPanel', 
    
    showXType: 'AutomationShow',
    
    editXType: 'AutomationEdit',
    
    listURL: '/json/catalog/automation/get-list',
    
    getURL: '/json/catalog/automation/get',
    
    addURL: '/json/catalog/automation/add',
    
    updateURL: '/json/catalog/automation/update',
    
    deleteURL: '/json/catalog/automation/delete',
    
    uploadURL: '/json/catalog/automation/upload',
    
    getImagesURL: '/json/catalog/automation/get-images',
    
    deleteImageURL: '/json/catalog/automation/delete-image',
    
    getRelatedServicesURL: '/json/catalog/automation/get-related-services',
    
    addRelatedServicesURL: '/json/catalog/automation/add-related-services',
    
    editRelatedServicesURL: '/json/catalog/automation/edit-related-services',
    
    deleteRelatedServicesURL: '/json/catalog/automation/delete-related-services'
    
});