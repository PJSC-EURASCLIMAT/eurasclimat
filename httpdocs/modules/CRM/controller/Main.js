Ext.define('EC.CRM.controller.Main', {
    
    extend: 'App.controller.ChapterAbstract',

    views: [
        'EC.CRM.view.Layout'
    ],
    
    viewLayout: 'CRMPanel',
    
    init: function() {
        
        var container = this.getContainer();
        
        this.getController('EC.CRM.controller.CurrentProjects').run(container);
       /*
        this.getController('EC.CRM.controller.ProjectsParticipants').run(container);
        this.getController('EC.CRM.controller.ProjectsDocuments').run(container);
        this.getController('EC.CRM.controller.Payments').run(container);
        this.getController('EC.CRM.controller.Methods').run(container);
        this.getController('EC.CRM.controller.Directories').run(container);
        this.getController('EC.CRM.controller.NewChapter').run(container);
        */
    },
    
    getMenu: function() {
        return [{
//            text: 'Функции',
//            icon: '/images/icons/features.png',
//        }, {
//            text: 'Сервисы',
//            icon: '/images/icons/services.png',
//        }, {
//            text: 'Документы',
//            icon: '/images/icons/documents.png',
//        }, {
//            text: 'Конструктор',
//            icon: '/images/icons/constructor.png',
//        }, {
//            text: 'Настройки',
//            icon: '/images/icons/settings.png',
        }];
    }
});