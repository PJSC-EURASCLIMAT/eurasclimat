Ext.define('EC.Recreation.controller.Main', {
    
    extend: 'App.controller.PortalAbstract',

    views: [
        'EC.Recreation.view.Layout'
    ],
    
    init: function(container) {
        
        if (container.down('RecreationPanel')) {
            container.down('RecreationPanel').show();
            return;
        }
        container.add({
            xtype: 'RecreationPanel',
            listeners: {
                show: function() {
                    var MC = this.getController('App.controller.Main');
                    MC.populateStaticMenu(this.getMenu());
                },
                scope: this
            }
        });
    },
    
    getMenu: function() {
        return [{
            text: 'Зона отдыха 1'
        }, {
            text: 'Зона отдыха 2'
        }];
    }
});