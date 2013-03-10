Ext.define('EC.CRM.controller.Directories', {
    
    extend: 'App.controller.PortalAbstract',

    views: [
        'EC.CRM.view.Directories.Layout'
    ],
    
    getMenu: function() {
        return [{
            text: 'Справочники 1'
        }, {
            text: 'Справочники 2'
        }];
    }
});