Ext.define('EC.Catalog.controller.Conditioning.Controls', {
    
    extend: 'EC.Catalog.controller.Abstract',
    
    views: [
        'EC.Catalog.view.Conditioning.Controls.FiltersPanel',
        'EC.Catalog.view.Conditioning.Controls.Show'
    ],
    
    entity: 'Conditioning.Controls',
    
    catalogName: 'Кондиционирование - Системы управления',
    
    fields: [],
    
    settingsView: 'EC.Catalog.view.Conditioning.Controls.SettingsLayout',
    
    filtersPanelXType: 'ConditioningControlsFiltersPanel', 
    
    showXType: 'ConditioningControlsShow',
    
    fieldsURL: '/catalog/conditioning-controls/get-fields',

    listURL: '/json/catalog/conditioning-controls/get-list',
    
    getURL: '/json/catalog/conditioning-controls/get',

    addURL: '/json/catalog/conditioning-controls/add',
    
    updateURL: '/json/catalog/conditioning-controls/update',
    
    deleteURL: '/json/catalog/conditioning-controls/delete',
    
    uploadURL: '/json/catalog/conditioning-controls/upload',
    
    getImagesURL: '/json/catalog/conditioning-controls/get-images',
    
    deleteImageURL: '/json/catalog/conditioning-controls/delete-image',
    
    getRelatedServicesURL: '/json/catalog/conditioning-controls/get-related-services',
    
    addRelatedServicesURL: '/json/catalog/conditioning-controls/add-related-services',
    
    editRelatedServicesURL: '/json/catalog/conditioning-controls/edit-related-services',
    
    deleteRelatedServicesURL: '/json/catalog/conditioning-controls/delete-related-services'

});