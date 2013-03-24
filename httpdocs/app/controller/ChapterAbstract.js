Ext.define('App.controller.ChapterAbstract', {
    
    extend: 'Ext.app.Controller',

    getContainer: function() {
        
        var container = Ext.getCmp('CenterPanel');
        
        if (container.down(this.viewLayout)) {
            container.down(this.viewLayout).show();
            return;
        }
        
        var MC = this.getController('App.controller.Main');
        var tab = container.add({
            xtype: this.viewLayout,
            listeners: {
                activate: function() {
                    MC.populateChapterMenu(this.getMenu());
                    if (!tab.getActiveTab()) {
                        tab.setActiveTab(tab.getActiveTab() || 0);
                    } else {
                        tab.getActiveTab().fireEvent('activate');
                    }
                },
                scope: this
            }
        });
        
        return tab;
    },
    
    getMenu: function() {
        return [];
    }
});