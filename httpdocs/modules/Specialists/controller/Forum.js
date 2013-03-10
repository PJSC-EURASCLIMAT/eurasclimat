Ext.define('EC.Specialists.controller.Forum', {
    
    extend: 'App.controller.PortalAbstract',

    views: [
        'EC.Specialists.view.Forum.Layout'
    ],
    
    getMenu: function() {
        return [{
            text: 'Форум 1'
        }, {
            text: 'Форум 2'
        }];
    }
});