Ext.define('EC.Specialists.controller.Main', {
    
    extend: 'App.controller.PortalAbstract',

    views: [
        'EC.Specialists.view.Layout'
    ],
    
    init: function(container) {
        
        if (container.down('SpecialistsPanel')) {
            container.down('SpecialistsPanel').show();
            return;
        }
        
        container.add({
            xtype: 'SpecialistsPanel',
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
            text: 'Специалисты 1'
        }, {
            text: 'Специалисты 2'
        }];
    }
});