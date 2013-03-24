Ext.define('EC.Main.controller.Main', {
    
    extend: 'App.controller.ChapterAbstract',

    views: [
        'EC.Main.view.Layout'
    ],
    
    viewLayout: 'MainPanel',
    
    init: function() {
        
        var container = this.getContainer();
        
        container.fireEvent('activate');
        container.setActiveTab(0);
        
        this.getController('EC.Main.controller.About').run(container);
        this.getController('EC.Main.controller.Development').run(container);
        this.getController('EC.Main.controller.Projects').run(container);
        this.getController('EC.Main.controller.Competitions').run(container);
        this.getController('EC.Main.controller.NewChapter').run(container);
        this.getController('EC.Main.controller.NewsSubChapter').run(container);
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