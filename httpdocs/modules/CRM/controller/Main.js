Ext.define('EC.CRM.controller.Main', {
    
    extend: 'App.controller.ChapterAbstract',

    views: [
        'EC.CRM.view.Layout'
    ],
    
    viewLayout: 'CRMPanel',
    
    init: function() {
        
        var container = this.callParent(arguments);
        
        this.getController('EC.CRM.controller.CurrentProjects').init(container);
        this.getController('EC.CRM.controller.ProjectsParticipants').init(container);
       /* this.getController('EC.CRM.controller.ProjectsDocuments').init(container);
        this.getController('EC.CRM.controller.Payments').init(container);
        this.getController('EC.CRM.controller.Methods').init(container);
        this.getController('EC.CRM.controller.Directories').init(container);*/
        this.getController('EC.CRM.controller.NewChapter').init(container);
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