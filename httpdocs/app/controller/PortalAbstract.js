Ext.define('App.controller.PortalAbstract', {
    
    extend: 'Ext.app.Controller',

    getContainer: function(container) {
        
        var MC = this.getController('App.controller.Main');
        var panel = container.add(Ext.create(this.views[0], {
            listeners: {
                activate: function() {
                    MC.populateSubchapterMenu(this.getMenu());
                },
                scope: this
            }
        }));
        
        return panel;
    },
    
    getMenu: function() {
        return [];
    }
});