Ext.define('EC.Specialists.controller.Main', {
    
    extend: 'App.controller.ChapterAbstract',

    views: [
        'EC.Specialists.view.Layout'
    ],
    
    viewLayout: 'SpecialistsPanel',

    init: function() {
        
        var container = this.getContainer();
        
        this.getController('EC.Specialists.controller.SpecialistsCatalog').run(container);
        this.getController('EC.Specialists.controller.Workgroups').run(container);
        this.getController('EC.Specialists.controller.Forum').run(container);
        this.getController('EC.Specialists.controller.NewChapter').run(container);
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