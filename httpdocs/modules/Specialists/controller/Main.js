Ext.define('EC.Specialists.controller.Main', {
    
    extend: 'App.controller.ChapterAbstract',

    views: [
        'EC.Specialists.view.Layout'
    ],
    
    viewLayout: 'SpecialistsPanel',

    init: function() {
        
        var container = this.callParent(arguments);
        
        this.getController('EC.Specialists.controller.SpecialistsCatalog').init(container);
        this.getController('EC.Specialists.controller.Workgroups').init(container);
        this.getController('EC.Specialists.controller.Forum').init(container);
        this.getController('EC.Specialists.controller.NewChapter').init(container);
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