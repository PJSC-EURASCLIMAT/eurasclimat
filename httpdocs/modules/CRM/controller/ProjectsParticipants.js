Ext.define('EC.CRM.controller.ProjectsParticipants', {
    
    extend: 'App.controller.PortalAbstract',

    views: [
        'EC.CRM.view.ProjectsParticipants.Layout'
    ],
    
    run: function(container) {
        this.getContainer(container);
    },
    
    getMenu: function() {
        return [{
            text: 'Поступившие предложения'
        }, {
            text: 'Инструментарий'
        }, {
            text: 'Справочники'    
        }];
    }
});