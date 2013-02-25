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
        this.mainPanel = container.add({xtype: 'SpecialistsPanel'});
        this.mainPanel.show();
       
        this.control({
            'SpecialistsPanel portlet': {
                restore: this.openModuleTab,
                maximize: this.openModuleFullscreen,
                scope: this
            }
        });
    }
});