Ext.define('EC.CRM.controller.ProjectsDocuments', {
    
    extend: 'App.controller.PortalAbstract',

    views: [
        'EC.CRM.view.ProjectsDocuments.Layout'
    ],
    
    getMenu: function() {
        return [{
            text: 'Документы проектов 1'
        }, {
            text: 'Документы проектов 2'
        }];
    }
});