Ext.define('EC.Market.controller.Main', {
    
    extend: 'App.controller.ChapterAbstract',

    views: [
        'EC.Market.view.Layout'
    ],
    
    viewLayout: 'MarketPanel',
    
    init: function() {
        
        var container = this.getContainer();
        
        this.getController('EC.Market.controller.NewProjects').run(container);
        this.getController('EC.Market.controller.CurrentProjects').run(container);
        this.getController('EC.Market.controller.Statistic').run(container);
        this.getController('EC.Market.controller.Rating').run(container);
        this.getController('EC.Market.controller.NewChapter').run(container);
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