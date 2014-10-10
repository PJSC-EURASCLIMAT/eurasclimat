Ext.define('EC.Catalog.controller.Electricity.Wires', {
    
    extend: 'EC.Catalog.controller.Abstract',
    
    views: [
        'EC.Catalog.view.Electricity.Wires.FiltersPanel'
    ],

    entity: 'Electricity.Wires',
    
    catalogName: 'Электрика - Провода',
    
    fields: [],
    
    settingsView: 'EC.Catalog.view.Electricity.Wires.SettingsLayout',
    
    filtersPanelXType: 'ElectricityWiresFiltersPanel', 
    
    showXType: 'ElectricityWiresShow',
    
    fieldsURL: '/catalog/electricity-wires/get-fields',

    listURL: '/json/catalog/electricity-wires/get-list',
    
    getURL: '/json/catalog/electricity-wires/get',

    addURL: '/json/catalog/electricity-wires/add',
    
    updateURL: '/json/catalog/electricity-wires/update',
    
    deleteURL: '/json/catalog/electricity-wires/delete',
    
    uploadURL: '/json/catalog/electricity-wires/upload',
    
    getImagesURL: '/json/catalog/electricity-wires/get-images',
    
    deleteImageURL: '/json/catalog/electricity-wires/delete-image',
    
    getRelatedServicesURL: '/json/catalog/electricity-wires/get-related-services',
    
    addRelatedServicesURL: '/json/catalog/electricity-wires/add-related-services',
    
    editRelatedServicesURL: '/json/catalog/electricity-wires/edit-related-services',
    
    deleteRelatedServicesURL: '/json/catalog/electricity-wires/delete-related-services'

});