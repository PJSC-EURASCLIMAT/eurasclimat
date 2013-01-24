Ext.define('EC.Main.controller.Article', {
    
    extend: 'Ext.app.Controller',

    views: [
        'EC.Main.view.Article',
        'EC.Main.view.ArticlePortlet'
    ],
    
    init: function(container) {
        
        this.Container = container; 
        
        var panel;
        
        if ('portlet' == container.getXType()) {
            panel = container.add(this.getView('EC.Main.view.ArticlePortlet').create());
            panel.down('button').on({
                click: this.openCard, 
                scope: this
            });
        } else {
            panel = container.add(this.getView('EC.Main.view.Article').create());
        }
    },
    
    openCard: function(grid, record, item, index, e, eOpts) {
        
        var MC = this.getController('EC.Main.controller.Main'); 
        MC.openModuleTab(this.Container);
    }
    
});