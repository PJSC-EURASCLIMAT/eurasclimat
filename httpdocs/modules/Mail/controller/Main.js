Ext.define('EC.Mail.controller.Main', {
    
    extend: 'App.controller.ChapterAbstract',

    views: [
        'EC.Mail.view.Layout'
    ],
    
    viewLayout: 'MailPanel',
    
    init: function() {
        
        var container = this.callParent(arguments);
        
        this.getController('EC.Mail.controller.SysMail').init(container);
        this.getController('EC.Mail.controller.CorpCellNet').init(container);
        this.getController('EC.Mail.controller.CorpBaseNet').init(container);
        this.getController('EC.Mail.controller.Chat').init(container);
        this.getController('EC.Mail.controller.VideoChat').init(container);
        this.getController('EC.Mail.controller.NewChapter').init(container);
    },
    
    getMenu: function() {
        return [{
            text: 'Корпоративная связь 1'
        }, {
            text: 'Корпоративная связь 2'
        }];
    }
});