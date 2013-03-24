Ext.define('EC.CRM.controller.Main', {
    
    extend: 'App.controller.ChapterAbstract',

    views: [
        'EC.CRM.view.Layout'
    ],
    
    viewLayout: 'CRMPanel',
    
    init: function() {
        
        var container = this.getContainer();
        
        this.getController('EC.CRM.controller.CurrentProjects').run(container);
        this.getController('EC.CRM.controller.ProjectsParticipants').run(container);
       /*
        this.getController('EC.CRM.controller.ProjectsDocuments').run(container);
        this.getController('EC.CRM.controller.Payments').run(container);
        this.getController('EC.CRM.controller.Methods').run(container);
        this.getController('EC.CRM.controller.Directories').run(container);
        */
        this.getController('EC.CRM.controller.NewChapter').run(container);
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