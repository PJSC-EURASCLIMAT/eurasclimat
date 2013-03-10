Ext.define('EC.Specialists.controller.Training', {
    
    extend: 'App.controller.PortalAbstract',

    views: [
        'EC.Specialists.view.Training.Layout'
    ],
    
    getMenu: function() {
        return [{
            text: 'Обучение 1'
        }, {
            text: 'Обучение 2'
        }];
    }
});