Ext.define('EC.Catalog.controller.Settings', {
    
    extend: 'Ext.app.Controller',
    
    models: [
        'EC.Catalog.model.Settings'
    ],

    views: [
        'EC.Catalog.view.SettingsList',
        'EC.Catalog.view.Conditioners.SettingsLayout'
    ],
    
    run: function(classname) {
        Ext.create(classname);
    }
});