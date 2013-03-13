Ext.define('EC.Specialists.controller.Workgroups', {
    
    extend: 'App.controller.PortalAbstract',

    views: [
        'EC.Specialists.view.Workgroups.Layout'
    ],
    
    getMenu: function() {
        return [{
            text: 'Рабочие группы 1'
        }, {
            text: 'Рабочие группы 2'
        }];
    }
});