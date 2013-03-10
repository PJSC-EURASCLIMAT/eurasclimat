Ext.define('EC.CRM.controller.ProjectsParticipants', {
    
    extend: 'App.controller.PortalAbstract',

    views: [
        'EC.CRM.view.ProjectsParticipants.Layout'
    ],
    
    getMenu: function() {
        return [{
            text: 'Участники проектов 1'
        }, {
            text: 'Участники проектов 2'
        }];
    }
});