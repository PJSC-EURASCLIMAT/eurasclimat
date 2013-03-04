Ext.define('EC.Recreation.controller.Main', {
    
    extend: 'App.controller.ChapterAbstract',

    views: [
        'EC.Recreation.view.Layout'
    ],
    
    viewLayout: 'RecreationPanel',
    
    getMenu: function() {
        return [{
            text: 'Зона отдыха 1'
        }, {
            text: 'Зона отдыха 2'
        }];
    }
});