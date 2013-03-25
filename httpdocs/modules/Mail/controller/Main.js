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
            text: 'Функции',
            icon: '/images/icons/features.png',
        }, {
            text: 'Сервисы',
            icon: '/images/icons/services.png',
        }, {
            text: 'Документы',
            icon: '/images/icons/documents.png',
        }, {
            text: 'Конструктор',
            icon: '/images/icons/constructor.png',
        }, {
            text: 'Настройки',
            icon: '/images/icons/settings.png',
        }];
    }
});