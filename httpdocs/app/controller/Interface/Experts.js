Ext.define('App.controller.Interface.Experts', {
    
    extend: 'App.controller.ChapterAbstract',

    views: ['App.view.Interface.Experts'],
    
    viewLayout: 'ExpertsPanel',
    
    init: function() {
        var container = this.getContainer();
        this.getController('App.controller.Interface.Experts.Experts').run(container);
    },
    
    getMenu: function() {
        return [];
    }
});