Ext.define('EC.Recreation.controller.Video', {
    
    extend: 'App.controller.PortalAbstract',

    views: [
        'EC.Recreation.view.Video.Layout'
    ],
    
    getMenu: function() {
        return [{
            text: 'Видео 1'
        }, {
            text: 'Видео 2'
        }];
    }
});