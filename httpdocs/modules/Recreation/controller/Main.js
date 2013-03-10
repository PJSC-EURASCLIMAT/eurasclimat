Ext.define('EC.Recreation.controller.Main', {
    
    extend: 'App.controller.ChapterAbstract',

    views: [
        'EC.Recreation.view.Layout'
    ],
    
    viewLayout: 'RecreationPanel',
    
    init: function() {
        
        var container = this.callParent(arguments);
        
        this.getController('EC.Recreation.controller.TV').init(container);
        this.getController('EC.Recreation.controller.Radio').init(container);
        this.getController('EC.Recreation.controller.Video').init(container);
        this.getController('EC.Recreation.controller.Music').init(container);
        this.getController('EC.Recreation.controller.Games').init(container);
        this.getController('EC.Recreation.controller.NewChapter').init(container);
    },
    
    getMenu: function() {
        return [{
            text: 'Зона отдыха 1'
        }, {
            text: 'Зона отдыха 2'
        }];
    }
});