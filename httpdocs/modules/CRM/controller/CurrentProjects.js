Ext.define('EC.CRM.controller.CurrentProjects', {
    
    extend: 'App.controller.PortalAbstract',

    views: [
        'EC.CRM.view.CurrentProjects.Layout'
    ],
    
    getMenu: function() {
        return [{
            text: 'Проекты в работе 1'
        }, {
            text: 'Проекты в работе 2'
        }];
    }
});