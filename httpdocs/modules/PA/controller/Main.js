Ext.define('EC.PA.controller.Main', {
    
    extend: 'App.controller.PortalAbstract',

    views: ['EC.PA.view.Layout'],
    
    init: function(container) {
        
        if (container.down('PAPanel')) {
            container.down('PAPanel').show();
            return;
        }
        container.add({xtype: 'PAPanel'});
    }
});