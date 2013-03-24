Ext.define('EC.Recreation.controller.Main', {
    
    extend: 'App.controller.ChapterAbstract',

    views: [
        'EC.Recreation.view.Layout'
    ],
    
    viewLayout: 'RecreationPanel',
    
    init: function() {
        
        var container = this.getContainer();
        
        this.getController('EC.Recreation.controller.TV').run(container);
        this.getController('EC.Recreation.controller.Radio').run(container);
        this.getController('EC.Recreation.controller.Video').run(container);
        this.getController('EC.Recreation.controller.Music').run(container);
        this.getController('EC.Recreation.controller.Games').run(container);
        this.getController('EC.Recreation.controller.NewChapter').run(container);
    },
    
    getMenu: function() {
        return [{
            text: 'Зона отдыха 1'
        }, {
            text: 'Зона отдыха 2'
        }];
    }
});