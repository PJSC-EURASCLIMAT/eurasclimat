Ext.define('EC.Main.controller.Main', {
    
    extend: 'App.controller.ChapterAbstract',

    views: [
        'EC.Main.view.Layout'
    ],
    
    viewLayout: 'MainPanel',
    
    init: function(container) {
        
        var container = this.callParent(arguments);
        
        container.fireEvent('activate');
        container.setActiveTab(0);
        
        this.getController('EC.Main.controller.About').init(container);
        this.getController('EC.Main.controller.Development').init(container);
        this.getController('EC.Main.controller.Projects').init(container);
        this.getController('EC.Main.controller.NewsSubChapter').init(container);
        this.getController('EC.Main.controller.Competitions').init(container);
        this.getController('EC.Main.controller.NewChapter').init(container);
    },
    
    getMenu: function() {
        return [{
            text: 'Главная 1'
        }, {
            text: 'Главная 2'
        }, {
            text: 'Главная 3'
        }];
    }
});