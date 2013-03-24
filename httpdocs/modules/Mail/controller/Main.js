Ext.define('EC.Mail.controller.Main', {
    
    extend: 'App.controller.ChapterAbstract',

    views: [
        'EC.Mail.view.Layout'
    ],
    
    viewLayout: 'MailPanel',
    
    init: function() {
        
        var container = this.getContainer();
        
        this.getController('EC.Mail.controller.SysMail').run(container);
        this.getController('EC.Mail.controller.CorpCellNet').run(container);
        this.getController('EC.Mail.controller.CorpBaseNet').run(container);
        this.getController('EC.Mail.controller.Chat').run(container);
        this.getController('EC.Mail.controller.VideoChat').run(container);
        this.getController('EC.Mail.controller.NewChapter').run(container);
    },
    
    getMenu: function() {
        return [{
            text: 'Функции раздела'
        }, {
            text: 'Сервисы раздела'
        }, {
            text: 'Документы раздела'
        }, {
            text: 'Конструктор раздела'
        }, {
            text: 'Настройки раздела'    
        }];
    }
});