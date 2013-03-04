Ext.define('EC.Mail.controller.Main', {
    
    extend: 'App.controller.ChapterAbstract',

    views: [
        'EC.Mail.view.Layout'
    ],
    
    viewLayout: 'MailPanel',
    
    getMenu: function() {
        return [{
            text: 'Корпоративная связь 1'
        }, {
            text: 'Корпоративная связь 2'
        }];
    }
});