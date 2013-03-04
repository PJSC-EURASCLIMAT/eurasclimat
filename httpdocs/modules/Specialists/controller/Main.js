Ext.define('EC.Specialists.controller.Main', {
    
    extend: 'App.controller.ChapterAbstract',

    views: [
        'EC.Specialists.view.Layout'
    ],
    
    viewLayout: 'SpecialistsPanel',
       
    getMenu: function() {
        return [{
            text: 'Специалисты 1'
        }, {
            text: 'Специалисты 2'
        }];
    }
});