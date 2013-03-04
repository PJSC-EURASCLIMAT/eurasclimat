Ext.define('App.controller.ChapterAbstract', {
    
    extend: 'Ext.app.Controller',

    init: function(container) {
        
        if (container.down(this.viewLayout)) {
            container.down(this.viewLayout).show();
            return;
        }
        
        container.add({
            xtype: this.viewLayout,
            listeners: {
                show: function() {
                    var MC = this.getController('App.controller.Main');
                    MC.populateStaticMenu(this.getMenu());
                },
                scope: this
            }
        });
        
        this.callParent(arguments);
    },
    
    getMenu: function() {
        return [];
    }
});