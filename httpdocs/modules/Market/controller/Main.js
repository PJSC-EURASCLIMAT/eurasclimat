Ext.define('EC.Market.controller.Main', {
    
    extend: 'App.controller.ChapterAbstract',

    views: [
        'EC.Market.view.Layout'
    ],
    
    viewLayout: 'MarketPanel',
    
    init: function() {
        
        var container = this.callParent(arguments);
        
        this.getController('EC.Market.controller.NewProjects').init(container);
        this.getController('EC.Market.controller.CurrentProjects').init(container);
        this.getController('EC.Market.controller.Statistic').init(container);
        this.getController('EC.Market.controller.Rating').init(container);
        this.getController('EC.Market.controller.NewChapter').init(container);
    },
    
    getMenu: function() {
        return [{
            text: 'Торговая площадка 1'
        }, {
            text: 'Торговая площадка 2'
        }];
    }
});