Ext.define('EC.Main.controller.Main', {
    
    extend: 'App.controller.ChapterAbstract',

    views: ['EC.Main.view.Layout'],
    
    viewLayout: 'MainPanel',
    
    init: function() {
        
        var container = this.getContainer();
        
        container.fireEvent('activate');
        container.setActiveTab(0);
        
        this.getController('EC.Main.controller.About').run(container);
        this.getController('EC.Main.controller.Development').run(container);
        /*
        this.getController('EC.Main.controller.Projects').run(container);
        this.getController('EC.Main.controller.Competitions').run(container);
        this.getController('EC.Main.controller.NewChapter').run(container);
         this.getController('EC.Main.controller.NewsSubChapter').run(container);
         */
    },
    
    getMenu: function() {
        return [
        /*
            {
            text: 'Функции',
            icon: '/images/icons/features.png'
        }, {
            text: 'Сервисы',
            icon: '/images/icons/services.png'
        }, {
            text: 'Документы',
            icon: '/images/icons/documents.png'
        }, {
            text: 'Конструктор',
            icon: '/images/icons/constructor.png'
        }, {
            text: 'Настройки',
            icon: '/images/icons/settings.png'
        }
        */
        ];
    }
});