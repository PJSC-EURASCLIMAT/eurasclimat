Ext.define('EC.CRM.controller.Main', {
    
    extend: 'App.controller.ChapterAbstract',

    views: [
        'EC.CRM.view.Layout'
    ],
    
    viewLayout: 'CRMPanel',
    
    getMenu: function() {
        return [{
            text: 'CRM 1'
        }, {
            text: 'CRM 2'
        }];
    }
});