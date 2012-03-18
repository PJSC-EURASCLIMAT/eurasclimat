Ext.define('EC.Catalog.controller.Main', {
    
    extend: 'Ext.app.Controller',

    views: ['Layout'],
    
    init: function() {
        console.log('Initialized Main controller! This happens before the Application launch function is called');
    }
});