Ext.define('App.controller.Interface.Main', {
    
    extend: 'App.controller.ChapterAbstract',

    views: ['App.view.Interface.Main'],
    
    viewLayout: 'MainPanel',
    
    init: function() {
        
        var container = this.getContainer();
        
        container.fireEvent('activate');
        container.setActiveTab(0);
        
        this.getController('App.controller.Interface.Main.About').run(container);
        
    },
    
    getMenu: function() {
        return [];
    }
});