Ext.define('EC.Market.controller.Main', {
    
    extend: 'App.controller.ChapterAbstract',

    views: [
        'EC.Market.view.Layout'
    ],
    
    viewLayout: 'MarketPanel',
    
    init: function() {
        
        var container = this.getContainer();
        this.getController('EC.Market.controller.Trade').run(container);

//        this.getController('EC.Market.controller.NewProjects').run(container);
        /*
        this.getController('EC.Market.controller.CurrentProjects').run(container);
        this.getController('EC.Market.controller.Statistic').run(container);
        this.getController('EC.Market.controller.Rating').run(container);
        this.getController('EC.Market.controller.NewChapter').run(container);
        */

    },
    
    getMenu: function() {
        return [{
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
        }];
    }
});